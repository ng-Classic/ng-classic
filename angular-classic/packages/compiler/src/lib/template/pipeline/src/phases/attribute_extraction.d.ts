/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentCompilation } from '../compilation';
/**
 * Find all attribute and binding ops, and collect them into the ElementAttribute structures.
 * In cases where no instruction needs to be generated for the attribute or binding, it is removed.
 */
export declare function phaseAttributeExtraction(cpl: ComponentCompilation, compatibility: boolean): void;
