/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

/**
 * @fileoverview The API from compiler-cli that the `@angular-classic/core`
 * package requires for migration schematics.
 */

export {forwardRefResolver} from '../lib/ngtsc/annotations';
export {Reference} from '../lib/ngtsc/imports';
export {DynamicValue, PartialEvaluator, ResolvedValue, ResolvedValueMap, StaticInterpreter} from '../lib/ngtsc/partial_evaluator';
export {reflectObjectLiteral, TypeScriptReflectionHost} from '../lib/ngtsc/reflection';
export {PotentialImport, PotentialImportKind, PotentialImportMode, TemplateTypeChecker} from '../lib/ngtsc/typecheck/api';
