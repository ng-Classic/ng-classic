/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as e from '../../../src/expression_parser/ast';
import * as a from '../../../src/render3/r3_ast';
import {DirectiveMeta, InputOutputPropertySet} from '../../../src/render3/view/t2_api';
import {R3TargetBinder} from '../../../src/render3/view/t2_binder';
import {parseTemplate} from '../../../src/render3/view/template';
import {CssSelector, SelectorMatcher} from '../../../src/selector';

import {findExpression} from './util';

/**
 * A `InputOutputPropertySet` which only uses an identity mapping for fields and properties.
 */
class IdentityInputMapping implements InputOutputPropertySet {
  private names: Set<string>;

  constructor(names: string[]) {
    this.names = new Set(names);
  }

  hasBindingPropertyName(propertyName: string): boolean {
    return this.names.has(propertyName);
  }
}

function makeSelectorMatcher(): SelectorMatcher<DirectiveMeta[]> {
  const matcher = new SelectorMatcher<DirectiveMeta[]>();
  matcher.addSelectables(CssSelector.parse('[ngFor][ngForOf]'), [{
                           name: 'NgFor',
                           exportAs: null,
                           inputs: new IdentityInputMapping(['ngForOf']),
                           outputs: new IdentityInputMapping([]),
                           isComponent: false,
                           isStructural: true,
                           selector: '[ngFor][ngForOf]',
                           animationTriggerNames: null,
                         }]);
  matcher.addSelectables(CssSelector.parse('[dir]'), [{
                           name: 'Dir',
                           exportAs: null,
                           inputs: new IdentityInputMapping([]),
                           outputs: new IdentityInputMapping([]),
                           isComponent: false,
                           isStructural: false,
                           selector: '[dir]',
                           animationTriggerNames: null,
                         }]);
  matcher.addSelectables(CssSelector.parse('[hasOutput]'), [{
                           name: 'HasOutput',
                           exportAs: null,
                           inputs: new IdentityInputMapping([]),
                           outputs: new IdentityInputMapping(['outputBinding']),
                           isComponent: false,
                           isStructural: false,
                           selector: '[hasOutput]',
                           animationTriggerNames: null,
                         }]);
  matcher.addSelectables(CssSelector.parse('[hasInput]'), [{
                           name: 'HasInput',
                           exportAs: null,
                           inputs: new IdentityInputMapping(['inputBinding']),
                           outputs: new IdentityInputMapping([]),
                           isComponent: false,
                           isStructural: false,
                           selector: '[hasInput]',
                           animationTriggerNames: null,
                         }]);
  matcher.addSelectables(CssSelector.parse('[sameSelectorAsInput]'), [{
                           name: 'SameSelectorAsInput',
                           exportAs: null,
                           inputs: new IdentityInputMapping(['sameSelectorAsInput']),
                           outputs: new IdentityInputMapping([]),
                           isComponent: false,
                           isStructural: false,
                           selector: '[sameSelectorAsInput]',
                           animationTriggerNames: null,
                         }]);

  const simpleDirectives = ['a', 'b', 'c', 'd', 'e', 'f'];
  const deferBlockDirectives = ['loading', 'error', 'placeholder'];
  for (const dir of [...simpleDirectives, ...deferBlockDirectives]) {
    const name = dir[0].toUpperCase() + dir.slice(1).toLowerCase();
    matcher.addSelectables(CssSelector.parse(`[${dir}]`), [{
                             name: `Dir${name}`,
                             exportAs: null,
                             inputs: new IdentityInputMapping([]),
                             outputs: new IdentityInputMapping([]),
                             isComponent: false,
                             isStructural: true,
                             selector: `[${dir}]`,
                             animationTriggerNames: null,
                           }]);
  }

  return matcher;
}

describe('t2 binding', () => {
  it('should bind a simple template', () => {
    const template = parseTemplate('<div *ngFor="let item of items">{{item.name}}</div>', '', {});
    const binder = new R3TargetBinder(new SelectorMatcher<DirectiveMeta[]>());
    const res = binder.bind({template: template.nodes});

    const itemBinding =
        (findExpression(template.nodes, '{{item.name}}')! as e.Interpolation).expressions[0] as
        e.PropertyRead;
    const item = itemBinding.receiver;
    const itemTarget = res.getExpressionTarget(item);
    if (!(itemTarget instanceof a.Variable)) {
      return fail('Expected item to point to a Variable');
    }
    expect(itemTarget.value).toBe('$implicit');
    const itemTemplate = res.getTemplateOfSymbol(itemTarget);
    expect(itemTemplate).not.toBeNull();
    expect(res.getNestingLevel(itemTemplate!)).toBe(1);
  });

  it('should match directives when binding a simple template', () => {
    const template = parseTemplate('<div *ngFor="let item of items">{{item.name}}</div>', '', {});
    const binder = new R3TargetBinder(makeSelectorMatcher());
    const res = binder.bind({template: template.nodes});
    const tmpl = template.nodes[0] as a.Template;
    const directives = res.getDirectivesOfNode(tmpl)!;
    expect(directives).not.toBeNull();
    expect(directives.length).toBe(1);
    expect(directives[0].name).toBe('NgFor');
  });

  it('should match directives on namespaced elements', () => {
    const template = parseTemplate('<svg><text dir>SVG</text></svg>', '', {});
    const matcher = new SelectorMatcher<DirectiveMeta[]>();
    matcher.addSelectables(CssSelector.parse('text[dir]'), [{
                             name: 'Dir',
                             exportAs: null,
                             inputs: new IdentityInputMapping([]),
                             outputs: new IdentityInputMapping([]),
                             isComponent: false,
                             isStructural: false,
                             selector: 'text[dir]',
                             animationTriggerNames: null,
                           }]);
    const binder = new R3TargetBinder(matcher);
    const res = binder.bind({template: template.nodes});
    const svgNode = template.nodes[0] as a.Element;
    const textNode = svgNode.children[0] as a.Element;
    const directives = res.getDirectivesOfNode(textNode)!;
    expect(directives).not.toBeNull();
    expect(directives.length).toBe(1);
    expect(directives[0].name).toBe('Dir');
  });

  it('should not match directives intended for an element on a microsyntax template', () => {
    const template = parseTemplate('<div *ngFor="let item of items" dir></div>', '', {});
    const binder = new R3TargetBinder(makeSelectorMatcher());
    const res = binder.bind({template: template.nodes});
    const tmpl = template.nodes[0] as a.Template;
    const tmplDirectives = res.getDirectivesOfNode(tmpl)!;
    expect(tmplDirectives).not.toBeNull();
    expect(tmplDirectives.length).toBe(1);
    expect(tmplDirectives[0].name).toBe('NgFor');
    const elDirectives = res.getDirectivesOfNode(tmpl.children[0] as a.Element)!;
    expect(elDirectives).not.toBeNull();
    expect(elDirectives.length).toBe(1);
    expect(elDirectives[0].name).toBe('Dir');
  });

  describe('matching inputs to consuming directives', () => {
    it('should work for bound attributes', () => {
      const template = parseTemplate('<div hasInput [inputBinding]="myValue"></div>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const attr = el.inputs[0];
      const consumer = res.getConsumerOfBinding(attr) as DirectiveMeta;
      expect(consumer.name).toBe('HasInput');
    });

    it('should work for text attributes on elements', () => {
      const template = parseTemplate('<div hasInput inputBinding="text"></div>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const attr = el.attributes[1];
      const consumer = res.getConsumerOfBinding(attr) as DirectiveMeta;
      expect(consumer.name).toBe('HasInput');
    });

    it('should work for text attributes on templates', () => {
      const template =
          parseTemplate('<ng-template hasInput inputBinding="text"></ng-template>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const attr = el.attributes[1];
      const consumer = res.getConsumerOfBinding(attr) as DirectiveMeta;
      expect(consumer.name).toBe('HasInput');
    });

    it('should not match directives on attribute bindings with the same name as an input', () => {
      const template =
          parseTemplate('<ng-template [attr.sameSelectorAsInput]="123"></ng-template>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const input = el.inputs[0];
      const consumer = res.getConsumerOfBinding(input);
      expect(consumer).toEqual(el);
    });

    it('should bind to the encompassing node when no directive input is matched', () => {
      const template = parseTemplate('<span dir></span>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const attr = el.attributes[0];
      const consumer = res.getConsumerOfBinding(attr);
      expect(consumer).toEqual(el);
    });
  });

  describe('matching outputs to consuming directives', () => {
    it('should work for bound events', () => {
      const template =
          parseTemplate('<div hasOutput (outputBinding)="myHandler($event)"></div>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const attr = el.outputs[0];
      const consumer = res.getConsumerOfBinding(attr) as DirectiveMeta;
      expect(consumer.name).toBe('HasOutput');
    });

    it('should bind to the encompassing node when no directive output is matched', () => {
      const template = parseTemplate('<span dir (fakeOutput)="myHandler($event)"></span>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      const el = template.nodes[0] as a.Element;
      const attr = el.outputs[0];
      const consumer = res.getConsumerOfBinding(attr);
      expect(consumer).toEqual(el);
    });
  });

  describe('extracting defer blocks info', () => {
    it('should extract top-level defer blocks', () => {
      const template = parseTemplate(
          `
            {#defer}<cmp-a />{/defer}
            {#defer}<cmp-b />{/defer}
            <cmp-c />
          `,
          '', {enabledBlockTypes: new Set(['defer'])});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const bound = binder.bind({template: template.nodes});
      const deferBlocks = bound.getDeferBlocks();
      expect(deferBlocks.length).toBe(2);
    });

    it('should extract nested defer blocks and associated pipes', () => {
      const template = parseTemplate(
          `
            {#defer}
              {{ name | pipeA }}
              {#defer}{{ name | pipeB }}{/defer}
            {:loading}
              {#defer}{{ name | pipeC }}{/defer}
              {{ name | loading }}
            {:placeholder}
              {#defer}{{ name | pipeD }}{/defer}
              {{ name | placeholder }}
            {:error}
              {#defer}{{ name | pipeE }}{/defer}
              {{ name | error }}
            {/defer}
            {{ name | pipeF }}
          `,
          '', {enabledBlockTypes: new Set(['defer'])});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const bound = binder.bind({template: template.nodes});
      const deferBlocks = bound.getDeferBlocks();

      expect(deferBlocks.length).toBe(5);

      // Record all pipes used within :placeholder, :loading and :error sub-blocks,
      // also record pipes used outside of any {#defer} blocks.
      expect(bound.getEagerlyUsedPipes()).toEqual(['placeholder', 'loading', 'error', 'pipeF']);

      // Record *all* pipes from the template, including the ones from {#defer} blocks.
      expect(bound.getUsedPipes()).toEqual([
        'pipeA', 'pipeB', 'pipeD', 'placeholder', 'pipeC', 'loading', 'pipeE', 'error', 'pipeF'
      ]);
    });

    it('should extract nested defer blocks and associated directives', () => {
      const template = parseTemplate(
          `
            {#defer}
              <img *a />
              {#defer}<img *b />{/defer}
            {:loading}
              {#defer}<img *c />{/defer}
              <img *loading />
            {:placeholder}
              {#defer}<img *d />{/defer}
              <img *placeholder />
            {:error}
              {#defer}<img *e />{/defer}
              <img *error />
            {/defer}
            <img *f />
          `,
          '', {enabledBlockTypes: new Set(['defer'])});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const bound = binder.bind({template: template.nodes});
      const deferBlocks = bound.getDeferBlocks();

      expect(deferBlocks.length).toBe(5);

      // Record all directives used within :placeholder, :loading and :error sub-blocks,
      // also record directives used outside of any {#defer} blocks.
      const eagerDirs = bound.getEagerlyUsedDirectives();
      expect(eagerDirs.length).toBe(4);
      expect(eagerDirs.map(dir => dir.name)).toEqual([
        'DirPlaceholder', 'DirLoading', 'DirError', 'DirF'
      ]);

      // Record *all* directives from the template, including the ones from {#defer} blocks.
      const allDirs = bound.getUsedDirectives();
      expect(allDirs.length).toBe(9);
      expect(allDirs.map(dir => dir.name)).toEqual([
        'DirA', 'DirB', 'DirD', 'DirPlaceholder', 'DirC', 'DirLoading', 'DirE', 'DirError', 'DirF'
      ]);
    });
  });

  describe('used pipes', () => {
    it('should record pipes used in interpolations', () => {
      const template = parseTemplate('{{value|date}}', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      expect(res.getUsedPipes()).toEqual(['date']);
    });

    it('should record pipes used in bound attributes', () => {
      const template = parseTemplate('<person [age]="age|number"></person>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      expect(res.getUsedPipes()).toEqual(['number']);
    });

    it('should record pipes used in bound template attributes', () => {
      const template = parseTemplate('<ng-template [ngIf]="obs|async"></ng-template>', '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      expect(res.getUsedPipes()).toEqual(['async']);
    });

    it('should record pipes used in ICUs', () => {
      const template = parseTemplate(
          `<span i18n>{count|number, plural,
            =1 { {{value|date}} }
          }</span>`,
          '', {});
      const binder = new R3TargetBinder(makeSelectorMatcher());
      const res = binder.bind({template: template.nodes});
      expect(res.getUsedPipes()).toEqual(['number', 'date']);
    });
  });
});
