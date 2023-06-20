/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import {ConstantPool, outputAst as o, R3PartialDeclaration} from '@angular-classic/compiler';

import {AstObject} from '../../ast/ast_value';

/**
 * A definition generated by a `PartialLinker`, ready to emit.
 */
export interface LinkedDefinition {
  expression: o.Expression;
  statements: o.Statement[];
}

/**
 * An interface for classes that can link partial declarations into full definitions.
 */
export interface PartialLinker<TExpression> {
  /**
   * Link the partial declaration `metaObj` information to generate a full definition expression.
   *
   * @param metaObj An object that fits one of the `R3DeclareDirectiveMetadata` or
   *     `R3DeclareComponentMetadata` interfaces.
   */
  linkPartialDeclaration(
      constantPool: ConstantPool,
      metaObj: AstObject<R3PartialDeclaration, TExpression>): LinkedDefinition;
}
