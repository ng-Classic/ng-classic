/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as chars from '../chars';
import {Lexer, Token, TokenType} from '../expression_parser/lexer';
import * as html from '../ml_parser/ast';
import {ParseError, ParseSourceSpan} from '../parse_util';
import {BindingParser} from '../template_parser/binding_parser';

import * as t from './r3_ast';

/** Pattern for a timing value in a trigger. */
const TIME_PATTERN = /^\d+(ms|s)?$/;

/** Pattern for a separator between keywords in a trigger expression. */
const SEPARATOR_PATTERN = /^\s$/;

/** Pairs of characters that form syntax that is comma-delimited. */
const COMMA_DELIMITED_SYNTAX = new Map([
  [chars.$LBRACE, chars.$RBRACE],      // Object literals
  [chars.$LBRACKET, chars.$RBRACKET],  // Array literals
  [chars.$LPAREN, chars.$RPAREN],      // Function calls
]);

/** Possible types of `on` triggers. */
enum OnTriggerType {
  IDLE = 'idle',
  TIMER = 'timer',
  INTERACTION = 'interaction',
  IMMEDIATE = 'immediate',
  HOVER = 'hover',
  VIEWPORT = 'viewport',
}

/** Parses a `when` deferred trigger. */
export function parseWhenTrigger(
    {expression, sourceSpan}: html.BlockParameter, bindingParser: BindingParser,
    errors: ParseError[]): t.BoundDeferredTrigger|null {
  const whenIndex = expression.indexOf('when');

  // This is here just to be safe, we shouldn't enter this function
  // in the first place if a block doesn't have the "when" keyword.
  if (whenIndex === -1) {
    errors.push(new ParseError(sourceSpan, `Could not find "when" keyword in expression`));
    return null;
  }

  const start = getTriggerParametersStart(expression, whenIndex + 1);
  const parsed = bindingParser.parseBinding(
      expression.slice(start), false, sourceSpan, sourceSpan.start.offset + start);

  return new t.BoundDeferredTrigger(parsed, sourceSpan);
}

/** Parses an `on` trigger */
export function parseOnTrigger(
    {expression, sourceSpan}: html.BlockParameter, errors: ParseError[]): t.DeferredTrigger[] {
  const onIndex = expression.indexOf('on');

  // This is here just to be safe, we shouldn't enter this function
  // in the first place if a block doesn't have the "on" keyword.
  if (onIndex === -1) {
    errors.push(new ParseError(sourceSpan, `Could not find "on" keyword in expression`));
    return [];
  }

  const start = getTriggerParametersStart(expression, onIndex + 1);
  return new OnTriggerParser(expression, start, sourceSpan, errors).parse();
}

class OnTriggerParser {
  private index = 0;
  private tokens: Token[];
  private triggers: t.DeferredTrigger[] = [];

  constructor(
      private expression: string, private start: number, private span: ParseSourceSpan,
      private errors: ParseError[]) {
    this.tokens = new Lexer().tokenize(expression.slice(start));
  }

  parse(): t.DeferredTrigger[] {
    while (this.tokens.length > 0 && this.index < this.tokens.length) {
      const token = this.token();

      if (!token.isIdentifier()) {
        this.unexpectedToken(token);
        break;
      }

      // An identifier immediately followed by a comma or the end of
      // the expression cannot have parameters so we can exit early.
      if (this.isFollowedByOrLast(chars.$COMMA)) {
        this.consumeTrigger(token, []);
        this.advance();
      } else if (this.isFollowedByOrLast(chars.$LPAREN)) {
        this.advance();  // Advance to the opening paren.
        const prevErrors = this.errors.length;
        const parameters = this.consumeParameters();
        if (this.errors.length !== prevErrors) {
          break;
        }
        this.consumeTrigger(token, parameters);
        this.advance();  // Advance past the closing paren.
      } else if (this.index < this.tokens.length - 1) {
        this.unexpectedToken(this.tokens[this.index + 1]);
      }

      this.advance();
    }

    return this.triggers;
  }

  private advance() {
    this.index++;
  }

  private isFollowedByOrLast(char: number): boolean {
    if (this.index === this.tokens.length - 1) {
      return true;
    }

    return this.tokens[this.index + 1].isCharacter(char);
  }

  private token(): Token {
    return this.tokens[Math.min(this.index, this.tokens.length - 1)];
  }

  private consumeTrigger(identifier: Token, parameters: string[]) {
    const startSpan = this.span.start.moveBy(this.start + identifier.index - this.tokens[0].index);
    const endSpan = startSpan.moveBy(this.token().end - identifier.index);
    const sourceSpan = new ParseSourceSpan(startSpan, endSpan);

    try {
      switch (identifier.toString()) {
        case OnTriggerType.IDLE:
          this.triggers.push(createIdleTrigger(parameters, sourceSpan));
          break;

        case OnTriggerType.TIMER:
          this.triggers.push(createTimerTrigger(parameters, sourceSpan));
          break;

        case OnTriggerType.INTERACTION:
          this.triggers.push(createInteractionTrigger(parameters, sourceSpan));
          break;

        case OnTriggerType.IMMEDIATE:
          this.triggers.push(createImmediateTrigger(parameters, sourceSpan));
          break;

        case OnTriggerType.HOVER:
          this.triggers.push(createHoverTrigger(parameters, sourceSpan));
          break;

        case OnTriggerType.VIEWPORT:
          this.triggers.push(createViewportTrigger(parameters, sourceSpan));
          break;

        default:
          throw new Error(`Unrecognized trigger type "${identifier}"`);
      }
    } catch (e) {
      this.error(identifier, (e as Error).message);
    }
  }

  private consumeParameters(): string[] {
    const parameters: string[] = [];

    if (!this.token().isCharacter(chars.$LPAREN)) {
      this.unexpectedToken(this.token());
      return parameters;
    }

    this.advance();

    const commaDelimStack: number[] = [];
    let current = '';

    while (this.index < this.tokens.length) {
      const token = this.token();

      // Stop parsing if we've hit the end character and we're outside of a comma-delimited syntax.
      // Note that we don't need to account for strings here since the lexer already parsed them
      // into string tokens.
      if (token.isCharacter(chars.$RPAREN) && commaDelimStack.length === 0) {
        if (current.length) {
          parameters.push(current);
        }
        break;
      }

      // In the `on` microsyntax "top-level" commas (e.g. ones outside of an parameters) separate
      // the different triggers (e.g. `on idle,timer(500)`). This is problematic, because the
      // function-like syntax also implies that multiple parameters can be passed into the
      // individual trigger (e.g. `on foo(a, b)`). To avoid tripping up the parser with commas that
      // are part of other sorts of syntax (object literals, arrays), we treat anything inside
      // a comma-delimited syntax block as plain text.
      if (token.type === TokenType.Character && COMMA_DELIMITED_SYNTAX.has(token.numValue)) {
        commaDelimStack.push(COMMA_DELIMITED_SYNTAX.get(token.numValue)!);
      }

      if (commaDelimStack.length > 0 &&
          token.isCharacter(commaDelimStack[commaDelimStack.length - 1])) {
        commaDelimStack.pop();
      }

      // If we hit a comma outside of a comma-delimited syntax, it means
      // that we're at the top level and we're starting a new parameter.
      if (commaDelimStack.length === 0 && token.isCharacter(chars.$COMMA) && current.length > 0) {
        parameters.push(current);
        current = '';
        this.advance();
        continue;
      }

      // Otherwise treat the token as a plain text character in the current parameter.
      current += this.tokenText();
      this.advance();
    }

    if (!this.token().isCharacter(chars.$RPAREN) || commaDelimStack.length > 0) {
      this.error(this.token(), 'Unexpected end of expression');
    }

    if (this.index < this.tokens.length - 1 &&
        !this.tokens[this.index + 1].isCharacter(chars.$COMMA)) {
      this.unexpectedToken(this.tokens[this.index + 1]);
    }

    return parameters;
  }

  private tokenText(): string {
    // Tokens have a toString already which we could use, but for string tokens it omits the quotes.
    // Eventually we could expose this information on the token directly.
    return this.expression.slice(this.start + this.token().index, this.start + this.token().end);
  }

  private error(token: Token, message: string): void {
    const newStart = this.span.start.moveBy(this.start + token.index);
    const newEnd = newStart.moveBy(token.end - token.index);
    this.errors.push(new ParseError(new ParseSourceSpan(newStart, newEnd), message));
  }

  private unexpectedToken(token: Token) {
    this.error(token, `Unexpected token "${token}"`);
  }
}

function createIdleTrigger(
    parameters: string[], sourceSpan: ParseSourceSpan): t.IdleDeferredTrigger {
  if (parameters.length > 0) {
    throw new Error(`"${OnTriggerType.IDLE}" trigger cannot have parameters`);
  }

  return new t.IdleDeferredTrigger(sourceSpan);
}

function createTimerTrigger(parameters: string[], sourceSpan: ParseSourceSpan) {
  if (parameters.length !== 1) {
    throw new Error(`"${OnTriggerType.TIMER}" trigger must have exactly one parameter`);
  }

  const delay = parseDeferredTime(parameters[0]);

  if (delay === null) {
    throw new Error(`Could not parse time value of trigger "${OnTriggerType.TIMER}"`);
  }

  return new t.TimerDeferredTrigger(delay, sourceSpan);
}

function createInteractionTrigger(
    parameters: string[], sourceSpan: ParseSourceSpan): t.InteractionDeferredTrigger {
  if (parameters.length > 1) {
    throw new Error(`"${OnTriggerType.INTERACTION}" trigger can only have zero or one parameters`);
  }

  return new t.InteractionDeferredTrigger(parameters[0] ?? null, sourceSpan);
}

function createImmediateTrigger(
    parameters: string[], sourceSpan: ParseSourceSpan): t.ImmediateDeferredTrigger {
  if (parameters.length > 0) {
    throw new Error(`"${OnTriggerType.IMMEDIATE}" trigger cannot have parameters`);
  }

  return new t.ImmediateDeferredTrigger(sourceSpan);
}

function createHoverTrigger(
    parameters: string[], sourceSpan: ParseSourceSpan): t.HoverDeferredTrigger {
  if (parameters.length > 0) {
    throw new Error(`"${OnTriggerType.HOVER}" trigger cannot have parameters`);
  }

  return new t.HoverDeferredTrigger(sourceSpan);
}

function createViewportTrigger(
    parameters: string[], sourceSpan: ParseSourceSpan): t.ViewportDeferredTrigger {
  // TODO: the RFC has some more potential parameters for `viewport`.
  if (parameters.length > 1) {
    throw new Error(`"${OnTriggerType.VIEWPORT}" trigger can only have zero or one parameters`);
  }

  return new t.ViewportDeferredTrigger(parameters[0] ?? null, sourceSpan);
}

/** Gets the index within an expression at which the trigger parameters start. */
export function getTriggerParametersStart(value: string, startPosition = 0): number {
  let hasFoundSeparator = false;

  for (let i = startPosition; i < value.length; i++) {
    if (SEPARATOR_PATTERN.test(value[i])) {
      hasFoundSeparator = true;
    } else if (hasFoundSeparator) {
      return i;
    }
  }

  return -1;
}

/**
 * Parses a time expression from a deferred trigger to
 * milliseconds. Returns null if it cannot be parsed.
 */
export function parseDeferredTime(value: string): number|null {
  const match = value.match(TIME_PATTERN);

  if (!match) {
    return null;
  }

  const [time, units] = match;
  return parseInt(time) * (units === 's' ? 1000 : 1);
}
