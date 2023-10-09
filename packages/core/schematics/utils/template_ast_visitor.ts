/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import type {TmplAstBoundAttribute, TmplAstBoundEvent, TmplAstBoundText, TmplAstContent, TmplAstDeferredBlock, TmplAstDeferredBlockError, TmplAstDeferredBlockLoading, TmplAstDeferredBlockPlaceholder, TmplAstDeferredTrigger, TmplAstElement, TmplAstIcu, TmplAstNode, TmplAstRecursiveVisitor, TmplAstReference, TmplAstTemplate, TmplAstText, TmplAstTextAttribute, TmplAstVariable} from '@angular-classic/compiler';

/**
 * A base class that can be used to implement a Render3 Template AST visitor.
 * Schematics are also currently required to be CommonJS to support execution within the Angular
 * CLI. As a result, the ESM `@angular-classic/compiler` package must be loaded via a native dynamic import.
 * Using a dynamic import makes classes extending from classes present in `@angular-classic/compiler`
 * complicated due to the class not being present at module evaluation time. The classes using a
 * base class found within `@angular-classic/compiler` must be wrapped in a factory to allow the class value
 * to be accessible at runtime after the dynamic import has completed. This class implements the
 * interface of the `TmplAstRecursiveVisitor` class (but does not extend) as the
 * `TmplAstRecursiveVisitor` as an interface provides the required set of visit methods. The base
 * interface `Visitor<T>` is not exported.
 */
export class TemplateAstVisitor implements TmplAstRecursiveVisitor {
  /**
   * Creates a new Render3 Template AST visitor using an instance of the `@angular-classic/compiler`
   * package. Passing in the compiler is required due to the need to dynamically import the
   * ESM `@angular-classic/compiler` into a CommonJS schematic.
   *
   * @param compilerModule The compiler instance that should be used within the visitor.
   */
  constructor(protected readonly compilerModule: typeof import('@angular-classic/compiler')) {}

  visitElement(element: TmplAstElement): void {}
  visitTemplate(template: TmplAstTemplate): void {}
  visitContent(content: TmplAstContent): void {}
  visitVariable(variable: TmplAstVariable): void {}
  visitReference(reference: TmplAstReference): void {}
  visitTextAttribute(attribute: TmplAstTextAttribute): void {}
  visitBoundAttribute(attribute: TmplAstBoundAttribute): void {}
  visitBoundEvent(attribute: TmplAstBoundEvent): void {}
  visitText(text: TmplAstText): void {}
  visitBoundText(text: TmplAstBoundText): void {}
  visitIcu(icu: TmplAstIcu): void {}
  visitDeferredBlock(deferred: TmplAstDeferredBlock): void {}
  visitDeferredBlockPlaceholder(block: TmplAstDeferredBlockPlaceholder): void {}
  visitDeferredBlockError(block: TmplAstDeferredBlockError): void {}
  visitDeferredBlockLoading(block: TmplAstDeferredBlockLoading): void {}
  visitDeferredTrigger(trigger: TmplAstDeferredTrigger): void {}

  /**
   * Visits all the provided nodes in order using this Visitor's visit methods.
   * This is a simplified variant of the `visitAll` function found inside of (but not
   * exported from) the `@angular-classic/compiler` that does not support returning a value
   * since the migrations do not directly transform the nodes.
   *
   * @param nodes An iterable of nodes to visit using this visitor.
   */
  visitAll(nodes: Iterable<TmplAstNode>): void {
    for (const node of nodes) {
      node.visit(this);
    }
  }
}
