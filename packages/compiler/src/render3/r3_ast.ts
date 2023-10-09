/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {SecurityContext} from '../core';
import {AST, BindingType, BoundElementProperty, ParsedEvent, ParsedEventType} from '../expression_parser/ast';
import {I18nMeta} from '../i18n/i18n_ast';
import {ParseSourceSpan} from '../parse_util';

export interface Node {
  sourceSpan: ParseSourceSpan;
  visit<Result>(visitor: Visitor<Result>): Result;
}

/**
 * This is an R3 `Node`-like wrapper for a raw `html.Comment` node. We do not currently
 * require the implementation of a visitor for Comments as they are only collected at
 * the top-level of the R3 AST, and only if `Render3ParseOptions['collectCommentNodes']`
 * is true.
 */
export class Comment implements Node {
  constructor(public value: string, public sourceSpan: ParseSourceSpan) {}
  visit<Result>(_visitor: Visitor<Result>): Result {
    throw new Error('visit() not implemented for Comment');
  }
}

export class Text implements Node {
  constructor(public value: string, public sourceSpan: ParseSourceSpan) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitText(this);
  }
}

export class BoundText implements Node {
  constructor(public value: AST, public sourceSpan: ParseSourceSpan, public i18n?: I18nMeta) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitBoundText(this);
  }
}

/**
 * Represents a text attribute in the template.
 *
 * `valueSpan` may not be present in cases where there is no value `<div a></div>`.
 * `keySpan` may also not be present for synthetic attributes from ICU expansions.
 */
export class TextAttribute implements Node {
  constructor(
      public name: string, public value: string, public sourceSpan: ParseSourceSpan,
      readonly keySpan: ParseSourceSpan|undefined, public valueSpan?: ParseSourceSpan,
      public i18n?: I18nMeta) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitTextAttribute(this);
  }
}

export class BoundAttribute implements Node {
  constructor(
      public name: string, public type: BindingType, public securityContext: SecurityContext,
      public value: AST, public unit: string|null, public sourceSpan: ParseSourceSpan,
      readonly keySpan: ParseSourceSpan, public valueSpan: ParseSourceSpan|undefined,
      public i18n: I18nMeta|undefined) {}

  static fromBoundElementProperty(prop: BoundElementProperty, i18n?: I18nMeta): BoundAttribute {
    if (prop.keySpan === undefined) {
      throw new Error(
          `Unexpected state: keySpan must be defined for bound attributes but was not for ${
              prop.name}: ${prop.sourceSpan}`);
    }
    return new BoundAttribute(
        prop.name, prop.type, prop.securityContext, prop.value, prop.unit, prop.sourceSpan,
        prop.keySpan, prop.valueSpan, i18n);
  }

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitBoundAttribute(this);
  }
}

export class BoundEvent implements Node {
  constructor(
      public name: string, public type: ParsedEventType, public handler: AST,
      public target: string|null, public phase: string|null, public sourceSpan: ParseSourceSpan,
      public handlerSpan: ParseSourceSpan, readonly keySpan: ParseSourceSpan) {}

  static fromParsedEvent(event: ParsedEvent) {
    const target: string|null = event.type === ParsedEventType.Regular ? event.targetOrPhase : null;
    const phase: string|null =
        event.type === ParsedEventType.Animation ? event.targetOrPhase : null;
    if (event.keySpan === undefined) {
      throw new Error(`Unexpected state: keySpan must be defined for bound event but was not for ${
          event.name}: ${event.sourceSpan}`);
    }
    return new BoundEvent(
        event.name, event.type, event.handler, target, phase, event.sourceSpan, event.handlerSpan,
        event.keySpan);
  }

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitBoundEvent(this);
  }
}

export class Element implements Node {
  constructor(
      public name: string, public attributes: TextAttribute[], public inputs: BoundAttribute[],
      public outputs: BoundEvent[], public children: Node[], public references: Reference[],
      public sourceSpan: ParseSourceSpan, public startSourceSpan: ParseSourceSpan,
      public endSourceSpan: ParseSourceSpan|null, public i18n?: I18nMeta) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitElement(this);
  }
}

export abstract class DeferredTrigger implements Node {
  constructor(public sourceSpan: ParseSourceSpan) {}

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitDeferredTrigger(this);
  }
}

export class BoundDeferredTrigger extends DeferredTrigger {
  constructor(public value: AST, sourceSpan: ParseSourceSpan) {
    super(sourceSpan);
  }
}

export class IdleDeferredTrigger extends DeferredTrigger {}

export class ImmediateDeferredTrigger extends DeferredTrigger {}

export class HoverDeferredTrigger extends DeferredTrigger {}

export class TimerDeferredTrigger extends DeferredTrigger {
  constructor(public delay: number, sourceSpan: ParseSourceSpan) {
    super(sourceSpan);
  }
}

export class InteractionDeferredTrigger extends DeferredTrigger {
  constructor(public reference: string|null, sourceSpan: ParseSourceSpan) {
    super(sourceSpan);
  }
}

export class ViewportDeferredTrigger extends DeferredTrigger {
  constructor(public reference: string|null, sourceSpan: ParseSourceSpan) {
    super(sourceSpan);
  }
}

export class DeferredBlockPlaceholder implements Node {
  constructor(
      public children: Node[], public minimumTime: number|null, public sourceSpan: ParseSourceSpan,
      public startSourceSpan: ParseSourceSpan, public endSourceSpan: ParseSourceSpan|null) {}

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitDeferredBlockPlaceholder(this);
  }
}

export class DeferredBlockLoading implements Node {
  constructor(
      public children: Node[], public afterTime: number|null, public minimumTime: number|null,
      public sourceSpan: ParseSourceSpan, public startSourceSpan: ParseSourceSpan,
      public endSourceSpan: ParseSourceSpan|null) {}

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitDeferredBlockLoading(this);
  }
}

export class DeferredBlockError implements Node {
  constructor(
      public children: Node[], public sourceSpan: ParseSourceSpan,
      public startSourceSpan: ParseSourceSpan, public endSourceSpan: ParseSourceSpan|null) {}

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitDeferredBlockError(this);
  }
}

export class DeferredBlock implements Node {
  constructor(
      public children: Node[], public triggers: DeferredTrigger[],
      public prefetchTriggers: DeferredTrigger[], public placeholder: DeferredBlockPlaceholder|null,
      public loading: DeferredBlockLoading|null, public error: DeferredBlockError|null,
      public sourceSpan: ParseSourceSpan, public startSourceSpan: ParseSourceSpan,
      public endSourceSpan: ParseSourceSpan|null) {}

  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitDeferredBlock(this);
  }
}

export class Template implements Node {
  constructor(
      // tagName is the name of the container element, if applicable.
      // `null` is a special case for when there is a structural directive on an `ng-template` so
      // the renderer can differentiate between the synthetic template and the one written in the
      // file.
      public tagName: string|null,
      public attributes: TextAttribute[],
      public inputs: BoundAttribute[],
      public outputs: BoundEvent[],
      public templateAttrs: (BoundAttribute|TextAttribute)[],
      public children: Node[],
      public references: Reference[],
      public variables: Variable[],
      public sourceSpan: ParseSourceSpan,
      public startSourceSpan: ParseSourceSpan,
      public endSourceSpan: ParseSourceSpan|null,
      public i18n?: I18nMeta,
  ) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitTemplate(this);
  }
}

export class Content implements Node {
  readonly name = 'ng-content';

  constructor(
      public selector: string, public attributes: TextAttribute[],
      public sourceSpan: ParseSourceSpan, public i18n?: I18nMeta) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitContent(this);
  }
}

export class Variable implements Node {
  constructor(
      public name: string, public value: string, public sourceSpan: ParseSourceSpan,
      readonly keySpan: ParseSourceSpan, public valueSpan?: ParseSourceSpan) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitVariable(this);
  }
}

export class Reference implements Node {
  constructor(
      public name: string, public value: string, public sourceSpan: ParseSourceSpan,
      readonly keySpan: ParseSourceSpan, public valueSpan?: ParseSourceSpan) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitReference(this);
  }
}

export class Icu implements Node {
  constructor(
      public vars: {[name: string]: BoundText},
      public placeholders: {[name: string]: Text|BoundText}, public sourceSpan: ParseSourceSpan,
      public i18n?: I18nMeta) {}
  visit<Result>(visitor: Visitor<Result>): Result {
    return visitor.visitIcu(this);
  }
}

export interface Visitor<Result = any> {
  // Returning a truthy value from `visit()` will prevent `visitAll()` from the call to the typed
  // method and result returned will become the result included in `visitAll()`s result array.
  visit?(node: Node): Result;

  visitElement(element: Element): Result;
  visitTemplate(template: Template): Result;
  visitContent(content: Content): Result;
  visitVariable(variable: Variable): Result;
  visitReference(reference: Reference): Result;
  visitTextAttribute(attribute: TextAttribute): Result;
  visitBoundAttribute(attribute: BoundAttribute): Result;
  visitBoundEvent(attribute: BoundEvent): Result;
  visitText(text: Text): Result;
  visitBoundText(text: BoundText): Result;
  visitIcu(icu: Icu): Result;
  visitDeferredBlock(deferred: DeferredBlock): Result;
  visitDeferredBlockPlaceholder(block: DeferredBlockPlaceholder): Result;
  visitDeferredBlockError(block: DeferredBlockError): Result;
  visitDeferredBlockLoading(block: DeferredBlockLoading): Result;
  visitDeferredTrigger(trigger: DeferredTrigger): Result;
}

export class RecursiveVisitor implements Visitor<void> {
  visitElement(element: Element): void {
    visitAll(this, element.attributes);
    visitAll(this, element.inputs);
    visitAll(this, element.outputs);
    visitAll(this, element.children);
    visitAll(this, element.references);
  }
  visitTemplate(template: Template): void {
    visitAll(this, template.attributes);
    visitAll(this, template.inputs);
    visitAll(this, template.outputs);
    visitAll(this, template.children);
    visitAll(this, template.references);
    visitAll(this, template.variables);
  }
  visitDeferredBlock(deferred: DeferredBlock): void {
    visitAll(this, deferred.triggers);
    visitAll(this, deferred.prefetchTriggers);
    visitAll(this, deferred.children);
    deferred.placeholder?.visit(this);
    deferred.loading?.visit(this);
    deferred.error?.visit(this);
  }
  visitDeferredBlockPlaceholder(block: DeferredBlockPlaceholder): void {
    visitAll(this, block.children);
  }
  visitDeferredBlockError(block: DeferredBlockError): void {
    visitAll(this, block.children);
  }
  visitDeferredBlockLoading(block: DeferredBlockLoading): void {
    visitAll(this, block.children);
  }
  visitContent(content: Content): void {}
  visitVariable(variable: Variable): void {}
  visitReference(reference: Reference): void {}
  visitTextAttribute(attribute: TextAttribute): void {}
  visitBoundAttribute(attribute: BoundAttribute): void {}
  visitBoundEvent(attribute: BoundEvent): void {}
  visitText(text: Text): void {}
  visitBoundText(text: BoundText): void {}
  visitIcu(icu: Icu): void {}
  visitDeferredTrigger(trigger: DeferredTrigger): void {}
}


export function visitAll<Result>(visitor: Visitor<Result>, nodes: Node[]): Result[] {
  const result: Result[] = [];
  if (visitor.visit) {
    for (const node of nodes) {
      visitor.visit(node) || node.visit(visitor);
    }
  } else {
    for (const node of nodes) {
      const newNode = node.visit(visitor);
      if (newNode) {
        result.push(newNode);
      }
    }
  }
  return result;
}
