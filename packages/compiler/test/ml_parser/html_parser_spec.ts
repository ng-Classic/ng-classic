/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import * as html from '../../src/ml_parser/ast';
import {HtmlParser} from '../../src/ml_parser/html_parser';
import {ParseTreeResult, TreeError} from '../../src/ml_parser/parser';
import {TokenType} from '../../src/ml_parser/tokens';
import {ParseError} from '../../src/parse_util';

import {humanizeDom, humanizeDomSourceSpans, humanizeLineColumn, humanizeNodes} from './ast_spec_utils';

{
  describe('HtmlParser', () => {
    let parser: HtmlParser;

    beforeEach(() => {
      parser = new HtmlParser();
    });

    describe('parse', () => {
      describe('text nodes', () => {
        it('should parse root level text nodes', () => {
          expect(humanizeDom(parser.parse('a', 'TestComp'))).toEqual([[html.Text, 'a', 0, ['a']]]);
        });

        it('should parse text nodes inside regular elements', () => {
          expect(humanizeDom(parser.parse('<div>a</div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0], [html.Text, 'a', 1, ['a']]
          ]);
        });

        it('should parse text nodes inside <ng-template> elements', () => {
          expect(humanizeDom(parser.parse('<ng-template>a</ng-template>', 'TestComp'))).toEqual([
            [html.Element, 'ng-template', 0], [html.Text, 'a', 1, ['a']]
          ]);
        });

        it('should parse CDATA', () => {
          expect(humanizeDom(parser.parse('<![CDATA[text]]>', 'TestComp'))).toEqual([
            [html.Text, 'text', 0, ['text']]
          ]);
        });

        it('should normalize line endings within CDATA', () => {
          const parsed = parser.parse('<![CDATA[ line 1 \r\n line 2 ]]>', 'TestComp');
          expect(humanizeDom(parsed)).toEqual([
            [html.Text, ' line 1 \n line 2 ', 0, [' line 1 \n line 2 ']],
          ]);
          expect(parsed.errors).toEqual([]);
        });
      });

      describe('elements', () => {
        it('should parse root level elements', () => {
          expect(humanizeDom(parser.parse('<div></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0]
          ]);
        });

        it('should parse elements inside of regular elements', () => {
          expect(humanizeDom(parser.parse('<div><span></span></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0], [html.Element, 'span', 1]
          ]);
        });

        it('should parse elements inside  <ng-template> elements', () => {
          expect(humanizeDom(parser.parse('<ng-template><span></span></ng-template>', 'TestComp')))
              .toEqual([[html.Element, 'ng-template', 0], [html.Element, 'span', 1]]);
        });

        it('should support void elements', () => {
          expect(humanizeDom(parser.parse('<link rel="author license" href="/about">', 'TestComp')))
              .toEqual([
                [html.Element, 'link', 0],
                [html.Attribute, 'rel', 'author license', ['author license']],
                [html.Attribute, 'href', '/about', ['/about']],
              ]);
        });

        it('should not error on void elements from HTML5 spec',
           () => {  // https://html.spec.whatwg.org/multipage/syntax.html#syntax-elements without:
             // <base> - it can be present in head only
             // <meta> - it can be present in head only
             // <command> - obsolete
             // <keygen> - obsolete
             ['<map><area></map>',
              '<div><br></div>',
              '<colgroup><col></colgroup>',
              '<div><embed></div>',
              '<div><hr></div>',
              '<div><img></div>',
              '<div><input></div>',
              '<object><param>/<object>',
              '<audio><source></audio>',
              '<audio><track></audio>',
              '<p><wbr></p>',
             ].forEach((html) => {
               expect(parser.parse(html, 'TestComp').errors).toEqual([]);
             });
           });

        it('should close void elements on text nodes', () => {
          expect(humanizeDom(parser.parse('<p>before<br>after</p>', 'TestComp'))).toEqual([
            [html.Element, 'p', 0],
            [html.Text, 'before', 1, ['before']],
            [html.Element, 'br', 1],
            [html.Text, 'after', 1, ['after']],
          ]);
        });

        it('should support optional end tags', () => {
          expect(humanizeDom(parser.parse('<div><p>1<p>2</div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'p', 1],
            [html.Text, '1', 2, ['1']],
            [html.Element, 'p', 1],
            [html.Text, '2', 2, ['2']],
          ]);
        });

        it('should support nested elements', () => {
          expect(humanizeDom(parser.parse('<ul><li><ul><li></li></ul></li></ul>', 'TestComp')))
              .toEqual([
                [html.Element, 'ul', 0],
                [html.Element, 'li', 1],
                [html.Element, 'ul', 2],
                [html.Element, 'li', 3],
              ]);
        });

        /**
         * Certain elements (like <tr> or <col>) require parent elements of a certain type (ex. <tr>
         * can only be inside <tbody> / <thead>). The Angular Classic HTML parser doesn't validate those
         * HTML compliancy rules as "problematic" elements can be projected - in such case HTML (as
         * written in an Angular Classic template) might be "invalid" (spec-wise) but the resulting DOM will
         * still be correct.
         */
        it('should not wraps elements in a required parent', () => {
          expect(humanizeDom(parser.parse('<div><tr></tr></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'tr', 1],
          ]);
        });

        it('should support explicit namespace', () => {
          expect(humanizeDom(parser.parse('<myns:div></myns:div>', 'TestComp'))).toEqual([
            [html.Element, ':myns:div', 0]
          ]);
        });

        it('should support implicit namespace', () => {
          expect(humanizeDom(parser.parse('<svg></svg>', 'TestComp'))).toEqual([
            [html.Element, ':svg:svg', 0]
          ]);
        });

        it('should propagate the namespace', () => {
          expect(humanizeDom(parser.parse('<myns:div><p></p></myns:div>', 'TestComp'))).toEqual([
            [html.Element, ':myns:div', 0],
            [html.Element, ':myns:p', 1],
          ]);
        });

        it('should match closing tags case sensitive', () => {
          const errors = parser.parse('<DiV><P></p></dIv>', 'TestComp').errors;
          expect(errors.length).toEqual(2);
          expect(humanizeErrors(errors)).toEqual([
            [
              'p',
              'Unexpected closing tag "p". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
              '0:8'
            ],
            [
              'dIv',
              'Unexpected closing tag "dIv". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
              '0:12'
            ],
          ]);
        });

        it('should support self closing void elements', () => {
          expect(humanizeDom(parser.parse('<input />', 'TestComp'))).toEqual([
            [html.Element, 'input', 0]
          ]);
        });

        it('should support self closing foreign elements', () => {
          expect(humanizeDom(parser.parse('<math />', 'TestComp'))).toEqual([
            [html.Element, ':math:math', 0]
          ]);
        });

        it('should ignore LF immediately after textarea, pre and listing', () => {
          expect(humanizeDom(parser.parse(
                     '<p>\n</p><textarea>\n</textarea><pre>\n\n</pre><listing>\n\n</listing>',
                     'TestComp')))
              .toEqual([
                [html.Element, 'p', 0],
                [html.Text, '\n', 1, ['\n']],
                [html.Element, 'textarea', 0],
                [html.Element, 'pre', 0],
                [html.Text, '\n', 1, ['\n']],
                [html.Element, 'listing', 0],
                [html.Text, '\n', 1, ['\n']],
              ]);
        });

        it('should normalize line endings in text', () => {
          let parsed: ParseTreeResult;
          parsed = parser.parse('<title> line 1 \r\n line 2 </title>', 'TestComp');
          expect(humanizeDom(parsed)).toEqual([
            [html.Element, 'title', 0],
            [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
          ]);
          expect(parsed.errors).toEqual([]);

          parsed = parser.parse('<script> line 1 \r\n line 2 </script>', 'TestComp');
          expect(humanizeDom(parsed)).toEqual([
            [html.Element, 'script', 0],
            [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
          ]);
          expect(parsed.errors).toEqual([]);

          parsed = parser.parse('<div> line 1 \r\n line 2 </div>', 'TestComp');
          expect(humanizeDom(parsed)).toEqual([
            [html.Element, 'div', 0],
            [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
          ]);
          expect(parsed.errors).toEqual([]);

          parsed = parser.parse('<span> line 1 \r\n line 2 </span>', 'TestComp');
          expect(humanizeDom(parsed)).toEqual([
            [html.Element, 'span', 0],
            [html.Text, ' line 1 \n line 2 ', 1, [' line 1 \n line 2 ']],
          ]);
          expect(parsed.errors).toEqual([]);
        });

        it('should treat prematurely terminated interpolation as text', () => {
          const {errors, rootNodes} =
              parser.parse('<div><span>x {{ expr }<!---->} y</span><div></div></div>', 'TestComp');
          expect(humanizeNodes(rootNodes, true)).toEqual([
            [
              html.Element, 'div', 0, '<div><span>x {{ expr }<!---->} y</span><div></div></div>',
              '<div>', '</div>'
            ],
            [html.Element, 'span', 1, '<span>x {{ expr }<!---->} y</span>', '<span>', '</span>'],
            [html.Text, 'x {{ expr }', 2, ['x '], ['{{', ' expr }'], [''], 'x {{ expr }'],
            [html.Comment, '', 2, '<!---->'],
            [html.Text, '} y', 2, ['} y'], '} y'],
            [html.Element, 'div', 1, '<div></div>', '<div>', '</div>'],
          ]);
          expect(errors).toEqual([]);
        });
      });

      describe('attributes', () => {
        it('should parse attributes on regular elements case sensitive', () => {
          expect(humanizeDom(parser.parse('<div kEy="v" key2=v2></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'kEy', 'v', ['v']],
            [html.Attribute, 'key2', 'v2', ['v2']],
          ]);
        });

        it('should parse attributes containing interpolation', () => {
          expect(humanizeDom(parser.parse('<div foo="1{{message}}2"></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'foo', '1{{message}}2', ['1'], ['{{', 'message', '}}'], ['2']]
          ]);
        });

        it('should parse attributes containing unquoted interpolation', () => {
          expect(humanizeDom(parser.parse('<div foo={{message}}></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'foo', '{{message}}', [''], ['{{', 'message', '}}'], ['']]
          ]);
        });

        it('should parse bound inputs with expressions containing newlines', () => {
          expect(humanizeDom(parser.parse(
                     `<app-component
                        [attr]="[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]"></app-component>`,
                     'TestComp')))
              .toEqual([
                [html.Element, 'app-component', 0],
                [
                  html.Attribute, '[attr]', `[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`,
                  [`[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`]
                ],
              ]);
        });

        it('should parse attributes containing encoded entities', () => {
          expect(humanizeDom(parser.parse('<div foo="&amp;"></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'foo', '&', [''], ['&', '&amp;'], ['']],
          ]);
        });

        it('should parse attributes containing unquoted interpolation', () => {
          expect(humanizeDom(parser.parse('<div foo={{message}}></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'foo', '{{message}}', [''], ['{{', 'message', '}}'], ['']]
          ]);
        });

        it('should parse bound inputs with expressions containing newlines', () => {
          expect(humanizeDom(parser.parse(
                     `<app-component
                        [attr]="[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]"></app-component>`,
                     'TestComp')))
              .toEqual([
                [html.Element, 'app-component', 0],
                [
                  html.Attribute, '[attr]', `[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`,
                  [`[
                        {text: 'some text',url:'//www.google.com'},
                        {text:'other text',url:'//www.google.com'}]`]
                ],
              ]);
        });

        it('should decode HTML entities in interpolated attributes', () => {
          // Note that the detail of decoding corner-cases is tested in the
          // "should decode HTML entities in interpolations" spec.
          expect(humanizeDomSourceSpans(parser.parse('<div foo="{{&amp;}}"></div>', 'TestComp')))
              .toEqual([
                [
                  html.Element, 'div', 0, '<div foo="{{&amp;}}"></div>', '<div foo="{{&amp;}}">',
                  '</div>'
                ],
                [
                  html.Attribute, 'foo', '{{&}}', [''], ['{{', '&amp;', '}}'], [''],
                  'foo="{{&amp;}}"'
                ]
              ]);
        });

        it('should normalize line endings within attribute values', () => {
          const result =
              parser.parse('<div key="  \r\n line 1 \r\n   line 2  "></div>', 'TestComp');
          expect(humanizeDom(result)).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'key', '  \n line 1 \n   line 2  ', ['  \n line 1 \n   line 2  ']],
          ]);
          expect(result.errors).toEqual([]);
        });

        it('should parse attributes without values', () => {
          expect(humanizeDom(parser.parse('<div k></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0],
            [html.Attribute, 'k', ''],
          ]);
        });

        it('should parse attributes on svg elements case sensitive', () => {
          expect(humanizeDom(parser.parse('<svg viewBox="0"></svg>', 'TestComp'))).toEqual([
            [html.Element, ':svg:svg', 0],
            [html.Attribute, 'viewBox', '0', ['0']],
          ]);
        });

        it('should parse attributes on <ng-template> elements', () => {
          expect(humanizeDom(parser.parse('<ng-template k="v"></ng-template>', 'TestComp')))
              .toEqual([
                [html.Element, 'ng-template', 0],
                [html.Attribute, 'k', 'v', ['v']],
              ]);
        });

        it('should support namespace', () => {
          expect(humanizeDom(parser.parse('<svg:use xlink:href="Port" />', 'TestComp'))).toEqual([
            [html.Element, ':svg:use', 0],
            [html.Attribute, ':xlink:href', 'Port', ['Port']],
          ]);
        });

        it('should support a prematurely terminated interpolation in attribute', () => {
          const {errors, rootNodes} = parser.parse('<div p="{{ abc"><span></span>', 'TestComp');
          expect(humanizeNodes(rootNodes, true)).toEqual([
            [html.Element, 'div', 0, '<div p="{{ abc">', '<div p="{{ abc">', null],
            [html.Attribute, 'p', '{{ abc', [''], ['{{', ' abc'], [''], 'p="{{ abc"'],
            [html.Element, 'span', 1, '<span></span>', '<span>', '</span>'],
          ]);
          expect(humanizeErrors(errors)).toEqual([]);
        });
      });

      describe('comments', () => {
        it('should preserve comments', () => {
          expect(humanizeDom(parser.parse('<!-- comment --><div></div>', 'TestComp'))).toEqual([
            [html.Comment, 'comment', 0],
            [html.Element, 'div', 0],
          ]);
        });
        it('should normalize line endings within comments', () => {
          expect(humanizeDom(parser.parse('<!-- line 1 \r\n line 2 -->', 'TestComp'))).toEqual([
            [html.Comment, 'line 1 \n line 2', 0],
          ]);
        });
      });

      describe('expansion forms', () => {
        it('should parse out expansion forms', () => {
          const parsed = parser.parse(
              `<div>before{messages.length, plural, =0 {You have <b>no</b> messages} =1 {One {{message}}}}after</div>`,
              'TestComp', {tokenizeExpansionForms: true});

          expect(humanizeDom(parsed)).toEqual([
            [html.Element, 'div', 0],
            [html.Text, 'before', 1, ['before']],
            [html.Expansion, 'messages.length', 'plural', 1],
            [html.ExpansionCase, '=0', 2],
            [html.ExpansionCase, '=1', 2],
            [html.Text, 'after', 1, ['after']],
          ]);
          const cases = (<any>parsed.rootNodes[0]).children[1].cases;

          expect(humanizeDom(new ParseTreeResult(cases[0].expression, []))).toEqual([
            [html.Text, 'You have ', 0, ['You have ']],
            [html.Element, 'b', 0],
            [html.Text, 'no', 1, ['no']],
            [html.Text, ' messages', 0, [' messages']],
          ]);

          expect(humanizeDom(new ParseTreeResult(cases[1].expression, []))).toEqual([
            [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']]
          ]);
        });

        it('should normalize line-endings in expansion forms in inline templates if `i18nNormalizeLineEndingsInICUs` is true',
           () => {
             const parsed = parser.parse(
                 `<div>\r\n` +
                     `  {\r\n` +
                     `    messages.length,\r\n` +
                     `    plural,\r\n` +
                     `    =0 {You have \r\nno\r\n messages}\r\n` +
                     `    =1 {One {{message}}}}\r\n` +
                     `</div>`,
                 'TestComp', {
                   tokenizeExpansionForms: true,
                   escapedString: true,
                   i18nNormalizeLineEndingsInICUs: true,
                 });

             expect(humanizeDom(parsed)).toEqual([
               [html.Element, 'div', 0],
               [html.Text, '\n  ', 1, ['\n  ']],
               [html.Expansion, '\n    messages.length', 'plural', 1],
               [html.ExpansionCase, '=0', 2],
               [html.ExpansionCase, '=1', 2],
               [html.Text, '\n', 1, ['\n']],
             ]);
             const cases = (<any>parsed.rootNodes[0]).children[1].cases;

             expect(humanizeDom(new ParseTreeResult(cases[0].expression, []))).toEqual([
               [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
             ]);

             expect(humanizeDom(new ParseTreeResult(cases[1].expression, []))).toEqual([
               [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']]
             ]);

             expect(parsed.errors).toEqual([]);
           });

        it('should not normalize line-endings in ICU expressions in external templates when `i18nNormalizeLineEndingsInICUs` is not set',
           () => {
             const parsed = parser.parse(
                 `<div>\r\n` +
                     `  {\r\n` +
                     `    messages.length,\r\n` +
                     `    plural,\r\n` +
                     `    =0 {You have \r\nno\r\n messages}\r\n` +
                     `    =1 {One {{message}}}}\r\n` +
                     `</div>`,
                 'TestComp', {tokenizeExpansionForms: true, escapedString: true});

             expect(humanizeDom(parsed)).toEqual([
               [html.Element, 'div', 0],
               [html.Text, '\n  ', 1, ['\n  ']],
               [html.Expansion, '\r\n    messages.length', 'plural', 1],
               [html.ExpansionCase, '=0', 2],
               [html.ExpansionCase, '=1', 2],
               [html.Text, '\n', 1, ['\n']],
             ]);
             const cases = (<any>parsed.rootNodes[0]).children[1].cases;

             expect(humanizeDom(new ParseTreeResult(cases[0].expression, []))).toEqual([
               [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
             ]);

             expect(humanizeDom(new ParseTreeResult(cases[1].expression, []))).toEqual([
               [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']]
             ]);

             expect(parsed.errors).toEqual([]);
           });

        it('should normalize line-endings in expansion forms in external templates if `i18nNormalizeLineEndingsInICUs` is true',
           () => {
             const parsed = parser.parse(
                 `<div>\r\n` +
                     `  {\r\n` +
                     `    messages.length,\r\n` +
                     `    plural,\r\n` +
                     `    =0 {You have \r\nno\r\n messages}\r\n` +
                     `    =1 {One {{message}}}}\r\n` +
                     `</div>`,
                 'TestComp', {
                   tokenizeExpansionForms: true,
                   escapedString: false,
                   i18nNormalizeLineEndingsInICUs: true
                 });

             expect(humanizeDom(parsed)).toEqual([
               [html.Element, 'div', 0],
               [html.Text, '\n  ', 1, ['\n  ']],
               [html.Expansion, '\n    messages.length', 'plural', 1],
               [html.ExpansionCase, '=0', 2],
               [html.ExpansionCase, '=1', 2],
               [html.Text, '\n', 1, ['\n']],
             ]);
             const cases = (<any>parsed.rootNodes[0]).children[1].cases;

             expect(humanizeDom(new ParseTreeResult(cases[0].expression, []))).toEqual([
               [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
             ]);

             expect(humanizeDom(new ParseTreeResult(cases[1].expression, []))).toEqual([
               [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']]
             ]);

             expect(parsed.errors).toEqual([]);
           });

        it('should not normalize line-endings in ICU expressions in external templates when `i18nNormalizeLineEndingsInICUs` is not set',
           () => {
             const parsed = parser.parse(
                 `<div>\r\n` +
                     `  {\r\n` +
                     `    messages.length,\r\n` +
                     `    plural,\r\n` +
                     `    =0 {You have \r\nno\r\n messages}\r\n` +
                     `    =1 {One {{message}}}}\r\n` +
                     `</div>`,
                 'TestComp', {tokenizeExpansionForms: true, escapedString: false});

             expect(humanizeDom(parsed)).toEqual([
               [html.Element, 'div', 0],
               [html.Text, '\n  ', 1, ['\n  ']],
               [html.Expansion, '\r\n    messages.length', 'plural', 1],
               [html.ExpansionCase, '=0', 2],
               [html.ExpansionCase, '=1', 2],
               [html.Text, '\n', 1, ['\n']],
             ]);
             const cases = (<any>parsed.rootNodes[0]).children[1].cases;

             expect(humanizeDom(new ParseTreeResult(cases[0].expression, []))).toEqual([
               [html.Text, 'You have \nno\n messages', 0, ['You have \nno\n messages']],
             ]);

             expect(humanizeDom(new ParseTreeResult(cases[1].expression, []))).toEqual([
               [html.Text, 'One {{message}}', 0, ['One '], ['{{', 'message', '}}'], ['']]
             ]);

             expect(parsed.errors).toEqual([]);
           });

        it('should parse out expansion forms', () => {
          const parsed = parser.parse(
              `<div><span>{a, plural, =0 {b}}</span></div>`, 'TestComp',
              {tokenizeExpansionForms: true});

          expect(humanizeDom(parsed)).toEqual([
            [html.Element, 'div', 0],
            [html.Element, 'span', 1],
            [html.Expansion, 'a', 'plural', 2],
            [html.ExpansionCase, '=0', 3],
          ]);
        });

        it('should parse out nested expansion forms', () => {
          const parsed = parser.parse(
              `{messages.length, plural, =0 { {p.gender, select, male {m}} }}`, 'TestComp',
              {tokenizeExpansionForms: true});
          expect(humanizeDom(parsed)).toEqual([
            [html.Expansion, 'messages.length', 'plural', 0],
            [html.ExpansionCase, '=0', 1],
          ]);

          const firstCase = (<any>parsed.rootNodes[0]).cases[0];

          expect(humanizeDom(new ParseTreeResult(firstCase.expression, []))).toEqual([
            [html.Expansion, 'p.gender', 'select', 0],
            [html.ExpansionCase, 'male', 1],
            [html.Text, ' ', 0, [' ']],
          ]);
        });

        it('should normalize line endings in nested expansion forms for inline templates, when `i18nNormalizeLineEndingsInICUs` is true',
           () => {
             const parsed = parser.parse(
                 `{\r\n` +
                     `  messages.length, plural,\r\n` +
                     `  =0 { zero \r\n` +
                     `       {\r\n` +
                     `         p.gender, select,\r\n` +
                     `         male {m}\r\n` +
                     `       }\r\n` +
                     `     }\r\n` +
                     `}`,
                 'TestComp', {
                   tokenizeExpansionForms: true,
                   escapedString: true,
                   i18nNormalizeLineEndingsInICUs: true
                 });
             expect(humanizeDom(parsed)).toEqual([
               [html.Expansion, '\n  messages.length', 'plural', 0],
               [html.ExpansionCase, '=0', 1],
             ]);

             const expansion = parsed.rootNodes[0] as html.Expansion;
             expect(humanizeDom(new ParseTreeResult(expansion.cases[0].expression, []))).toEqual([
               [html.Text, 'zero \n       ', 0, ['zero \n       ']],
               [html.Expansion, '\n         p.gender', 'select', 0],
               [html.ExpansionCase, 'male', 1],
               [html.Text, '\n     ', 0, ['\n     ']],
             ]);

             expect(parsed.errors).toEqual([]);
           });

        it('should not normalize line endings in nested expansion forms for inline templates, when `i18nNormalizeLineEndingsInICUs` is not defined',
           () => {
             const parsed = parser.parse(
                 `{\r\n` +
                     `  messages.length, plural,\r\n` +
                     `  =0 { zero \r\n` +
                     `       {\r\n` +
                     `         p.gender, select,\r\n` +
                     `         male {m}\r\n` +
                     `       }\r\n` +
                     `     }\r\n` +
                     `}`,
                 'TestComp', {tokenizeExpansionForms: true, escapedString: true});
             expect(humanizeDom(parsed)).toEqual([
               [html.Expansion, '\r\n  messages.length', 'plural', 0],
               [html.ExpansionCase, '=0', 1],
             ]);

             const expansion = parsed.rootNodes[0] as html.Expansion;
             expect(humanizeDom(new ParseTreeResult(expansion.cases[0].expression, []))).toEqual([
               [html.Text, 'zero \n       ', 0, ['zero \n       ']],
               [html.Expansion, '\r\n         p.gender', 'select', 0],
               [html.ExpansionCase, 'male', 1],
               [html.Text, '\n     ', 0, ['\n     ']],
             ]);

             expect(parsed.errors).toEqual([]);
           });

        it('should not normalize line endings in nested expansion forms for external templates, when `i18nNormalizeLineEndingsInICUs` is not set',
           () => {
             const parsed = parser.parse(
                 `{\r\n` +
                     `  messages.length, plural,\r\n` +
                     `  =0 { zero \r\n` +
                     `       {\r\n` +
                     `         p.gender, select,\r\n` +
                     `         male {m}\r\n` +
                     `       }\r\n` +
                     `     }\r\n` +
                     `}`,
                 'TestComp', {tokenizeExpansionForms: true});
             expect(humanizeDom(parsed)).toEqual([
               [html.Expansion, '\r\n  messages.length', 'plural', 0],
               [html.ExpansionCase, '=0', 1],
             ]);

             const expansion = parsed.rootNodes[0] as html.Expansion;
             expect(humanizeDom(new ParseTreeResult(expansion.cases[0].expression, []))).toEqual([
               [html.Text, 'zero \n       ', 0, ['zero \n       ']],
               [html.Expansion, '\r\n         p.gender', 'select', 0],
               [html.ExpansionCase, 'male', 1],
               [html.Text, '\n     ', 0, ['\n     ']],
             ]);


             expect(parsed.errors).toEqual([]);
           });

        it('should error when expansion form is not closed', () => {
          const p = parser.parse(
              `{messages.length, plural, =0 {one}`, 'TestComp', {tokenizeExpansionForms: true});
          expect(humanizeErrors(p.errors)).toEqual([
            [null, 'Invalid ICU message. Missing \'}\'.', '0:34']
          ]);
        });

        it('should support ICU expressions with cases that contain numbers', () => {
          const p = parser.parse(
              `{sex, select, male {m} female {f} 0 {other}}`, 'TestComp',
              {tokenizeExpansionForms: true});
          expect(p.errors.length).toEqual(0);
        });

        it(`should support ICU expressions with cases that contain any character except '}'`,
           () => {
             const p = parser.parse(
                 `{a, select, b {foo} % bar {% bar}}`, 'TestComp', {tokenizeExpansionForms: true});
             expect(p.errors.length).toEqual(0);
           });

        it('should error when expansion case is not properly closed', () => {
          const p = parser.parse(
              `{a, select, b {foo} % { bar {% bar}}`, 'TestComp', {tokenizeExpansionForms: true});
          expect(humanizeErrors(p.errors)).toEqual([
            [
              TokenType.RAW_TEXT,
              'Unexpected character "EOF" (Do you have an unescaped "{" in your template? Use "{{ \'{\' }}") to escape it.)',
              '0:36'
            ],
            [null, 'Invalid ICU message. Missing \'}\'.', '0:22']
          ]);
        });

        it('should error when expansion case is not closed', () => {
          const p = parser.parse(
              `{messages.length, plural, =0 {one`, 'TestComp', {tokenizeExpansionForms: true});
          expect(humanizeErrors(p.errors)).toEqual([
            [null, 'Invalid ICU message. Missing \'}\'.', '0:29']
          ]);
        });

        it('should error when invalid html in the case', () => {
          const p = parser.parse(
              `{messages.length, plural, =0 {<b/>}`, 'TestComp', {tokenizeExpansionForms: true});
          expect(humanizeErrors(p.errors)).toEqual([
            ['b', 'Only void, custom and foreign elements can be self closed "b"', '0:30']
          ]);
        });
      });

      describe('blocks', () => {
        // TODO(crisbeto): temporary utility while blocks are disabled by default.
        const options = {tokenizeBlocks: true};

        function humanizeBlocks(input: string): any[] {
          return humanizeDom(parser.parse(input, 'TestComp', options));
        }

        it('should parse a block group', () => {
          expect(humanizeBlocks('{#foo a b; c d}hello{/foo}')).toEqual([
            [html.BlockGroup, 0],
            [html.Block, 'foo', 1],
            [html.BlockParameter, 'a b'],
            [html.BlockParameter, 'c d'],
            [html.Text, 'hello', 2, ['hello']],
          ]);
        });

        it('should parse a block group with an HTML element in the primary block', () => {
          expect(humanizeBlocks('{#defer}<my-cmp/>{/defer}')).toEqual([
            [html.BlockGroup, 0],
            [html.Block, 'defer', 1],
            [html.Element, 'my-cmp', 2],
          ]);
        });

        it('should parse a block group with blocks', () => {
          expect(humanizeBlocks(
                     '{#defer when isVisible()}<my-cmp/>' +
                     '{:loading after 100ms}Loading...' +
                     '{:placeholder minimum 50ms}Placeholder' +
                     '{/defer}'))
              .toEqual([
                [html.BlockGroup, 0],
                [html.Block, 'defer', 1],
                [html.BlockParameter, 'when isVisible()'],
                [html.Element, 'my-cmp', 2],
                [html.Block, 'loading', 1],
                [html.BlockParameter, 'after 100ms'],
                [html.Text, 'Loading...', 2, ['Loading...']],
                [html.Block, 'placeholder', 1],
                [html.BlockParameter, 'minimum 50ms'],
                [html.Text, 'Placeholder', 2, ['Placeholder']],
              ]);
        });

        it('should parse a block group with blocks containing mixed plain text and HTML', () => {
          expect(humanizeBlocks(
                     '{#defer when isVisible()}hello<my-cmp/>there' +
                         '{:loading after 100ms}<p>Loading...</p>' +
                         '{:placeholder minimum 50ms}P<strong>laceh<i>ol</i>de</strong>r' +
                         '{/defer}',
                     ))
              .toEqual([
                [html.BlockGroup, 0],
                [html.Block, 'defer', 1],
                [html.BlockParameter, 'when isVisible()'],
                [html.Text, 'hello', 2, ['hello']],
                [html.Element, 'my-cmp', 2],
                [html.Text, 'there', 2, ['there']],
                [html.Block, 'loading', 1],
                [html.BlockParameter, 'after 100ms'],
                [html.Element, 'p', 2],
                [html.Text, 'Loading...', 3, ['Loading...']],
                [html.Block, 'placeholder', 1],
                [html.BlockParameter, 'minimum 50ms'],
                [html.Text, 'P', 2, ['P']],
                [html.Element, 'strong', 2],
                [html.Text, 'laceh', 3, ['laceh']],
                [html.Element, 'i', 3],
                [html.Text, 'ol', 4, ['ol']],
                [html.Text, 'de', 3, ['de']],
                [html.Text, 'r', 2, ['r']],
              ]);
        });

        it('should parse nested block groups', () => {
          // clang-format off
          const markup = `<root-sibling-one/>` +
            `{#root}` +
              `<outer-child-one/>` +
              `<outer-child-two>` +
                `{#child}` +
                  `{:innerChild}` +
                    `<inner-child-one/>` +
                    `{#grandchild}` +
                      `{:innerGrandChild}` +
                        `<inner-grand-child-one/>` +
                      `{:innerGrandChild}` +
                        `<inner-grand-child-two/>` +
                  `{/grandchild}` +
                  `{:innerChild}` +
                  `<inner-child-two/>` +
                `{/child}` +
              `</outer-child-two>` +
              `{:outerChild}` +
                `<outer-child-three/>` +
            `{/root} <root-sibling-two/>`;
          // clang-format on

          expect(humanizeBlocks(markup)).toEqual([
            [html.Element, 'root-sibling-one', 0],
            [html.BlockGroup, 0],
            [html.Block, 'root', 1],
            [html.Element, 'outer-child-one', 2],
            [html.Element, 'outer-child-two', 2],
            [html.BlockGroup, 3],
            [html.Block, 'child', 4],
            [html.Block, 'innerChild', 4],
            [html.Element, 'inner-child-one', 5],
            [html.BlockGroup, 5],
            [html.Block, 'grandchild', 6],
            [html.Block, 'innerGrandChild', 6],
            [html.Element, 'inner-grand-child-one', 7],
            [html.Block, 'innerGrandChild', 6],
            [html.Element, 'inner-grand-child-two', 7],
            [html.Block, 'innerChild', 4],
            [html.Element, 'inner-child-two', 5],
            [html.Block, 'outerChild', 1],
            [html.Element, 'outer-child-three', 2],
            [html.Text, ' ', 0, [' ']],
            [html.Element, 'root-sibling-two', 0],
          ]);
        });

        it('should infer namespace through block group boundary', () => {
          expect(humanizeBlocks('<svg>{#if cond}<circle/>{/if}</svg>')).toEqual([
            [html.Element, ':svg:svg', 0],
            [html.BlockGroup, 1],
            [html.Block, 'if', 2],
            [html.BlockParameter, 'cond'],
            [html.Element, ':svg:circle', 3],
          ]);
        });

        it('should create an implicit empty block if there is a block at the root', () => {
          expect(humanizeBlocks(
                     '{#switch cond}' +
                     '{:case a}' +
                     'a case' +
                     '{:case b}' +
                     'b case' +
                     '{:default}' +
                     'no case' +
                     '{/switch}'))
              .toEqual([
                [html.BlockGroup, 0],
                [html.Block, 'switch', 1],
                [html.BlockParameter, 'cond'],
                [html.Block, 'case', 1],
                [html.BlockParameter, 'a'],
                [html.Text, 'a case', 2, ['a case']],
                [html.Block, 'case', 1],
                [html.BlockParameter, 'b'],
                [html.Text, 'b case', 2, ['b case']],
                [html.Block, 'default', 1],
                [html.Text, 'no case', 2, ['no case']],
              ]);
        });

        it('should parse a block group with empty blocks', () => {
          expect(humanizeBlocks('{#foo}{:a}{:b}{:c}{/foo}')).toEqual([
            [html.BlockGroup, 0],
            [html.Block, 'foo', 1],
            [html.Block, 'a', 1],
            [html.Block, 'b', 1],
            [html.Block, 'c', 1],
          ]);
        });

        it('should parse a block group with void elements', () => {
          expect(humanizeBlocks('{#foo}<br>{:bar}<img>{/foo}')).toEqual([
            [html.BlockGroup, 0],
            [html.Block, 'foo', 1],
            [html.Element, 'br', 2],
            [html.Block, 'bar', 1],
            [html.Element, 'img', 2],
          ]);
        });

        it('should close void elements used right before a block group', () => {
          expect(humanizeBlocks('<img>{#foo}hello{/foo}')).toEqual([
            [html.Element, 'img', 0],
            [html.BlockGroup, 0],
            [html.Block, 'foo', 1],
            [html.Text, 'hello', 2, ['hello']],
          ]);
        });

        it('should report an unexpected block close', () => {
          const errors = parser.parse('hello{/foo}', 'TestComp', options).errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([[
            'foo', 'Unexpected closing block "foo". The block may have been closed earlier.', '0:5'
          ]]);
        });

        it('should report unclosed tags inside of a block group', () => {
          const errors = parser.parse('{#foo}<strong>hello{/foo}', 'TestComp', options).errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([[
            'foo',
            'Unexpected closing block "foo". There is an unclosed "strong" HTML tag named that may have to be closed first.',
            '0:19'
          ]]);
        });

        it('should report block used at the root', () => {
          const errors = parser.parse('{:foo}hello', 'TestComp', options).errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([
            ['foo', 'Blocks can only be placed inside of block groups.', '0:0']
          ]);
        });

        it('should report block used inside of an HTML element', () => {
          const errors =
              parser.parse('{#group}<div>{:foo}hello</div>{/group}', 'TestComp', options).errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([
            ['foo', 'Blocks can only be placed inside of block groups.', '0:13']
          ]);
        });

        it('should report an unexpected closing tag inside a block', () => {
          const errors =
              parser.parse('<div>{#if cond}hello</div>{/if}', 'TestComp', options).errors;
          expect(errors.length).toEqual(2);
          expect(humanizeErrors(errors)).toEqual([
            [
              'div',
              'Unexpected closing tag "div". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
              '0:20'
            ],
            [
              'if', 'Unexpected closing block "if". The block may have been closed earlier.', '0:26'
            ],
          ]);
        });

        it('should store the source locations of block groups and blocks', () => {
          const markup = '{#defer when isVisible()}<div>hello</div>world' +
              '{:loading after 100ms}Loading...' +
              '{:placeholder minimum 50ms}Placeholde<strong>r</strong>' +
              '{/defer}';

          expect(humanizeDomSourceSpans(parser.parse(markup, 'TestComp', options))).toEqual([
            [html.BlockGroup, 0, markup, '{#defer when isVisible()}', '{/defer}'],
            [
              html.Block, 'defer', 1, '{#defer when isVisible()}<div>hello</div>world',
              '{#defer when isVisible()}', ''
            ],
            [html.BlockParameter, 'when isVisible()', 'when isVisible()'],
            [html.Element, 'div', 2, '<div>hello</div>', '<div>', '</div>'],
            [html.Text, 'hello', 3, ['hello'], 'hello'],
            [html.Text, 'world', 2, ['world'], 'world'],
            [
              html.Block, 'loading', 1, '{:loading after 100ms}Loading...',
              '{:loading after 100ms}', ''
            ],
            [html.BlockParameter, 'after 100ms', 'after 100ms'],
            [html.Text, 'Loading...', 2, ['Loading...'], 'Loading...'],
            [
              html.Block, 'placeholder', 1,
              '{:placeholder minimum 50ms}Placeholde<strong>r</strong>',
              '{:placeholder minimum 50ms}', ''
            ],
            [html.BlockParameter, 'minimum 50ms', 'minimum 50ms'],
            [html.Text, 'Placeholde', 2, ['Placeholde'], 'Placeholde'],
            [html.Element, 'strong', 2, '<strong>r</strong>', '<strong>', '</strong>'],
            [html.Text, 'r', 3, ['r'], 'r'],
          ]);
        });
      });

      describe('source spans', () => {
        it('should store the location', () => {
          expect(humanizeDomSourceSpans(parser.parse(
                     '<div [prop]="v1" (e)="do()" attr="v2" noValue>\na\n</div>', 'TestComp')))
              .toEqual([
                [
                  html.Element, 'div', 0,
                  '<div [prop]="v1" (e)="do()" attr="v2" noValue>\na\n</div>',
                  '<div [prop]="v1" (e)="do()" attr="v2" noValue>', '</div>'
                ],
                [html.Attribute, '[prop]', 'v1', ['v1'], '[prop]="v1"'],
                [html.Attribute, '(e)', 'do()', ['do()'], '(e)="do()"'],
                [html.Attribute, 'attr', 'v2', ['v2'], 'attr="v2"'],
                [html.Attribute, 'noValue', '', 'noValue'],
                [html.Text, '\na\n', 1, ['\na\n'], '\na\n'],
              ]);
        });

        it('should set the start and end source spans', () => {
          const node = <html.Element>parser.parse('<div>a</div>', 'TestComp').rootNodes[0];

          expect(node.startSourceSpan.start.offset).toEqual(0);
          expect(node.startSourceSpan.end.offset).toEqual(5);

          expect(node.endSourceSpan!.start.offset).toEqual(6);
          expect(node.endSourceSpan!.end.offset).toEqual(12);
        });

        // This checks backward compatibility with a previous version of the lexer, which would
        // treat interpolation expressions as regular HTML escapable text.
        it('should decode HTML entities in interpolations', () => {
          expect(humanizeDomSourceSpans(parser.parse(
                     '{{&amp;}}' +
                         '{{&#x25BE;}}' +
                         '{{&#9662;}}' +
                         '{{&unknown;}}' +
                         '{{&amp (no semi-colon)}}' +
                         '{{&#xyz; (invalid hex)}}' +
                         '{{&#25BE; (invalid decimal)}}',
                     'TestComp')))
              .toEqual([[
                html.Text,
                '{{&}}' +
                    '{{\u25BE}}' +
                    '{{\u25BE}}' +
                    '{{&unknown;}}' +
                    '{{&amp (no semi-colon)}}' +
                    '{{&#xyz; (invalid hex)}}' +
                    '{{&#25BE; (invalid decimal)}}',
                0,
                [''],
                ['{{', '&amp;', '}}'],
                [''],
                ['{{', '&#x25BE;', '}}'],
                [''],
                ['{{', '&#9662;', '}}'],
                [''],
                ['{{', '&unknown;', '}}'],
                [''],
                ['{{', '&amp (no semi-colon)', '}}'],
                [''],
                ['{{', '&#xyz; (invalid hex)', '}}'],
                [''],
                ['{{', '&#25BE; (invalid decimal)', '}}'],
                [''],
                '{{&amp;}}' +
                    '{{&#x25BE;}}' +
                    '{{&#9662;}}' +
                    '{{&unknown;}}' +
                    '{{&amp (no semi-colon)}}' +
                    '{{&#xyz; (invalid hex)}}' +
                    '{{&#25BE; (invalid decimal)}}',
              ]]);
        });

        it('should support interpolations in text', () => {
          expect(
              humanizeDomSourceSpans(parser.parse('<div> pre {{ value }} post </div>', 'TestComp')))
              .toEqual([
                [html.Element, 'div', 0, '<div> pre {{ value }} post </div>', '<div>', '</div>'],
                [
                  html.Text, ' pre {{ value }} post ', 1, [' pre '], ['{{', ' value ', '}}'],
                  [' post '], ' pre {{ value }} post '
                ],
              ]);
        });

        it('should not set the end source span for void elements', () => {
          expect(humanizeDomSourceSpans(parser.parse('<div><br></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0, '<div><br></div>', '<div>', '</div>'],
            [html.Element, 'br', 1, '<br>', '<br>', null],
          ]);
        });

        it('should not set the end source span for multiple void elements', () => {
          expect(humanizeDomSourceSpans(parser.parse('<div><br><hr></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0, '<div><br><hr></div>', '<div>', '</div>'],
            [html.Element, 'br', 1, '<br>', '<br>', null],
            [html.Element, 'hr', 1, '<hr>', '<hr>', null],
          ]);
        });

        it('should not set the end source span for standalone void elements', () => {
          expect(humanizeDomSourceSpans(parser.parse('<br>', 'TestComp'))).toEqual([
            [html.Element, 'br', 0, '<br>', '<br>', null],
          ]);
        });

        it('should set the end source span for standalone self-closing elements', () => {
          expect(humanizeDomSourceSpans(parser.parse('<br/>', 'TestComp'))).toEqual([
            [html.Element, 'br', 0, '<br/>', '<br/>', '<br/>'],
          ]);
        });

        it('should set the end source span for self-closing elements', () => {
          expect(humanizeDomSourceSpans(parser.parse('<div><br/></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0, '<div><br/></div>', '<div>', '</div>'],
            [html.Element, 'br', 1, '<br/>', '<br/>', '<br/>'],
          ]);
        });

        it('should not include leading trivia from the following node of an element in the end source',
           () => {
             expect(humanizeDomSourceSpans(
                        parser.parse('<input type="text" />\n\n\n  <span>\n</span>', 'TestComp', {
                          leadingTriviaChars: [' ', '\n', '\r', '\t'],
                        })))
                 .toEqual([
                   [
                     html.Element, 'input', 0, '<input type="text" />', '<input type="text" />',
                     '<input type="text" />'
                   ],
                   [html.Attribute, 'type', 'text', ['text'], 'type="text"'],
                   [html.Text, '\n\n\n  ', 0, ['\n\n\n  '], '', '\n\n\n  '],
                   [html.Element, 'span', 0, '<span>\n</span>', '<span>', '</span>'],
                   [html.Text, '\n', 1, ['\n'], '', '\n'],
                 ]);
           });

        it('should not set the end source span for elements that are implicitly closed', () => {
          expect(humanizeDomSourceSpans(parser.parse('<div><p></div>', 'TestComp'))).toEqual([
            [html.Element, 'div', 0, '<div><p></div>', '<div>', '</div>'],
            [html.Element, 'p', 1, '<p>', '<p>', null],
          ]);
          expect(humanizeDomSourceSpans(parser.parse('<div><li>A<li>B</div>', 'TestComp')))
              .toEqual([
                [html.Element, 'div', 0, '<div><li>A<li>B</div>', '<div>', '</div>'],
                [html.Element, 'li', 1, '<li>', '<li>', null],
                [html.Text, 'A', 2, ['A'], 'A'],
                [html.Element, 'li', 1, '<li>', '<li>', null],
                [html.Text, 'B', 2, ['B'], 'B'],
              ]);
        });

        it('should support expansion form', () => {
          expect(humanizeDomSourceSpans(parser.parse(
                     '<div>{count, plural, =0 {msg}}</div>', 'TestComp',
                     {tokenizeExpansionForms: true})))
              .toEqual([
                [html.Element, 'div', 0, '<div>{count, plural, =0 {msg}}</div>', '<div>', '</div>'],
                [html.Expansion, 'count', 'plural', 1, '{count, plural, =0 {msg}}'],
                [html.ExpansionCase, '=0', 2, '=0 {msg}'],
              ]);
        });

        it('should not report a value span for an attribute without a value', () => {
          const ast = parser.parse('<div bar></div>', 'TestComp');
          expect((ast.rootNodes[0] as html.Element).attrs[0].valueSpan).toBeUndefined();
        });

        it('should report a value span for an attribute with a value', () => {
          const ast = parser.parse('<div bar="12"></div>', 'TestComp');
          const attr = (ast.rootNodes[0] as html.Element).attrs[0];
          expect(attr.valueSpan!.start.offset).toEqual(10);
          expect(attr.valueSpan!.end.offset).toEqual(12);
        });

        it('should report a value span for an unquoted attribute value', () => {
          const ast = parser.parse('<div bar=12></div>', 'TestComp');
          const attr = (ast.rootNodes[0] as html.Element).attrs[0];
          expect(attr.valueSpan!.start.offset).toEqual(9);
          expect(attr.valueSpan!.end.offset).toEqual(11);
        });
      });

      describe('visitor', () => {
        it('should visit text nodes', () => {
          const result = humanizeDom(parser.parse('text', 'TestComp'));
          expect(result).toEqual([[html.Text, 'text', 0, ['text']]]);
        });

        it('should visit element nodes', () => {
          const result = humanizeDom(parser.parse('<div></div>', 'TestComp'));
          expect(result).toEqual([[html.Element, 'div', 0]]);
        });

        it('should visit attribute nodes', () => {
          const result = humanizeDom(parser.parse('<div id="foo"></div>', 'TestComp'));
          expect(result).toContain([html.Attribute, 'id', 'foo', ['foo']]);
        });

        it('should visit all nodes', () => {
          const result =
              parser.parse('<div id="foo"><span id="bar">a</span><span>b</span></div>', 'TestComp');
          const accumulator: html.Node[] = [];
          const visitor = new class implements html.Visitor {
            visit(node: html.Node, context: any) {
              accumulator.push(node);
            }
            visitElement(element: html.Element, context: any): any {
              html.visitAll(this, element.attrs);
              html.visitAll(this, element.children);
            }
            visitAttribute(attribute: html.Attribute, context: any): any {}
            visitText(text: html.Text, context: any): any {}
            visitComment(comment: html.Comment, context: any): any {}
            visitExpansion(expansion: html.Expansion, context: any): any {
              html.visitAll(this, expansion.cases);
            }
            visitExpansionCase(expansionCase: html.ExpansionCase, context: any): any {}
            visitBlockGroup(group: html.BlockGroup, context: any) {
              html.visitAll(this, group.blocks);
            }
            visitBlock(block: html.Block, context: any) {
              html.visitAll(this, block.parameters);
              html.visitAll(this, block.children);
            }
            visitBlockParameter(parameter: html.BlockParameter, context: any) {}
          };

          html.visitAll(visitor, result.rootNodes);
          expect(accumulator.map(n => n.constructor)).toEqual([
            html.Element, html.Attribute, html.Element, html.Attribute, html.Text, html.Element,
            html.Text
          ]);
        });

        it('should skip typed visit if visit() returns a truthy value', () => {
          const visitor = new class implements html.Visitor {
            visit(node: html.Node, context: any) {
              return true;
            }
            visitElement(element: html.Element, context: any): any {
              throw Error('Unexpected');
            }
            visitAttribute(attribute: html.Attribute, context: any): any {
              throw Error('Unexpected');
            }
            visitText(text: html.Text, context: any): any {
              throw Error('Unexpected');
            }
            visitComment(comment: html.Comment, context: any): any {
              throw Error('Unexpected');
            }
            visitExpansion(expansion: html.Expansion, context: any): any {
              throw Error('Unexpected');
            }
            visitExpansionCase(expansionCase: html.ExpansionCase, context: any): any {
              throw Error('Unexpected');
            }
            visitBlockGroup(group: html.BlockGroup, context: any) {
              throw Error('Unexpected');
            }
            visitBlock(block: html.Block, context: any) {
              throw Error('Unexpected');
            }
            visitBlockParameter(parameter: html.BlockParameter, context: any) {
              throw Error('Unexpected');
            }
          };
          const result = parser.parse('<div id="foo"></div><div id="bar"></div>', 'TestComp');
          const traversal = html.visitAll(visitor, result.rootNodes);
          expect(traversal).toEqual([true, true]);
        });
      });

      describe('errors', () => {
        it('should report unexpected closing tags', () => {
          const errors = parser.parse('<div></p></div>', 'TestComp').errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([[
            'p',
            'Unexpected closing tag "p". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
            '0:5'
          ]]);
        });

        it('gets correct close tag for parent when a child is not closed', () => {
          const {errors, rootNodes} = parser.parse('<div><span></div>', 'TestComp');
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([[
            'div',
            'Unexpected closing tag "div". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
            '0:11'
          ]]);
          expect(humanizeNodes(rootNodes, true)).toEqual([
            [html.Element, 'div', 0, '<div><span></div>', '<div>', '</div>'],
            [html.Element, 'span', 1, '<span>', '<span>', null],
          ]);
        });

        describe('incomplete element tag', () => {
          it('should parse and report incomplete tags after the tag name', () => {
            const {errors, rootNodes} = parser.parse('<div<span><div  </span>', 'TestComp');

            expect(humanizeNodes(rootNodes, true)).toEqual([
              [html.Element, 'div', 0, '<div', '<div', null],
              [html.Element, 'span', 0, '<span><div  </span>', '<span>', '</span>'],
              [html.Element, 'div', 1, '<div  ', '<div  ', null],
            ]);

            expect(humanizeErrors(errors)).toEqual([
              ['div', 'Opening tag "div" not terminated.', '0:0'],
              ['div', 'Opening tag "div" not terminated.', '0:10'],
            ]);
          });

          it('should parse and report incomplete tags after attribute', () => {
            const {errors, rootNodes} =
                parser.parse('<div class="hi" sty<span></span>', 'TestComp');

            expect(humanizeNodes(rootNodes, true)).toEqual([
              [html.Element, 'div', 0, '<div class="hi" sty', '<div class="hi" sty', null],
              [html.Attribute, 'class', 'hi', ['hi'], 'class="hi"'],
              [html.Attribute, 'sty', '', 'sty'],
              [html.Element, 'span', 0, '<span></span>', '<span>', '</span>'],
            ]);

            expect(humanizeErrors(errors)).toEqual([
              ['div', 'Opening tag "div" not terminated.', '0:0'],
            ]);
          });

          it('should parse and report incomplete tags after quote', () => {
            const {errors, rootNodes} = parser.parse('<div "<span></span>', 'TestComp');

            expect(humanizeNodes(rootNodes, true)).toEqual([
              [html.Element, 'div', 0, '<div ', '<div ', null],
              [html.Text, '"', 0, ['"'], '"'],
              [html.Element, 'span', 0, '<span></span>', '<span>', '</span>'],
            ]);

            expect(humanizeErrors(errors)).toEqual([
              ['div', 'Opening tag "div" not terminated.', '0:0'],
            ]);
          });

          it('should report subsequent open tags without proper close tag', () => {
            const errors = parser.parse('<div</div>', 'TestComp').errors;
            expect(errors.length).toEqual(2);
            expect(humanizeErrors(errors)).toEqual([
              ['div', 'Opening tag "div" not terminated.', '0:0'],
              // TODO(ayazhafiz): the following error is unnecessary and can be pruned if we keep
              // track of the incomplete tag names.
              [
                'div',
                'Unexpected closing tag "div". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
                '0:4'
              ]
            ]);
          });
        });

        it('should report closing tag for void elements', () => {
          const errors = parser.parse('<input></input>', 'TestComp').errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([
            ['input', 'Void elements do not have end tags "input"', '0:7']
          ]);
        });

        it('should report self closing html element', () => {
          const errors = parser.parse('<p />', 'TestComp').errors;
          expect(errors.length).toEqual(1);
          expect(humanizeErrors(errors)).toEqual([
            ['p', 'Only void, custom and foreign elements can be self closed "p"', '0:0']
          ]);
        });

        it('should not report self closing custom element', () => {
          expect(parser.parse('<my-cmp />', 'TestComp').errors).toEqual([]);
        });

        it('should also report lexer errors', () => {
          const errors = parser.parse('<!-err--><div></p></div>', 'TestComp').errors;
          expect(errors.length).toEqual(2);
          expect(humanizeErrors(errors)).toEqual([
            [TokenType.COMMENT_START, 'Unexpected character "e"', '0:3'],
            [
              'p',
              'Unexpected closing tag "p". It may happen when the tag has already been closed by another tag. For more info see https://www.w3.org/TR/html5/syntax.html#closing-elements-that-have-implied-end-tags',
              '0:14'
            ]
          ]);
        });
      });
    });
  });
}

export function humanizeErrors(errors: ParseError[]): any[] {
  return errors.map(e => {
    if (e instanceof TreeError) {
      // Parser errors
      return [<any>e.elementName, e.msg, humanizeLineColumn(e.span.start)];
    }
    // Tokenizer errors
    return [(<any>e).tokenType, e.msg, humanizeLineColumn(e.span.start)];
  });
}
