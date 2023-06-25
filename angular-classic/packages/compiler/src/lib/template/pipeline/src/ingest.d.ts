/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ConstantPool } from '../../../constant_pool';
import * as t from '../../../render3/r3_ast';
import { ComponentCompilation } from './compilation';
/**
 * Process a template AST and convert it into a `ComponentCompilation` in the intermediate
 * representation.
 */
export declare function ingest(componentName: string, template: t.Node[], constantPool: ConstantPool): ComponentCompilation;
