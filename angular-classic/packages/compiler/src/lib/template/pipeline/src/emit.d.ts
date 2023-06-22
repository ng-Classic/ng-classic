/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import * as o from '../../../../lib/output/output_ast';
import { ConstantPool } from '../../../constant_pool';
import type { ComponentCompilation } from './compilation';
/**
 * Run all transformation phases in the correct order against a `ComponentCompilation`. After this
 * processing, the compilation should be in a state where it can be emitted via `emitTemplateFn`.s
 */
export declare function transformTemplate(cpl: ComponentCompilation): void;
/**
 * Compile all views in the given `ComponentCompilation` into the final template function, which may
 * reference constants defined in a `ConstantPool`.
 */
export declare function emitTemplateFn(tpl: ComponentCompilation, pool: ConstantPool): o.FunctionExpr;
