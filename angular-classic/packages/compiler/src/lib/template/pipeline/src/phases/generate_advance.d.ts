/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentCompilation } from '../compilation';
/**
 * Generate `ir.AdvanceOp`s in between `ir.UpdateOp`s that ensure the runtime's implicit slot
 * context will be advanced correctly.
 */
export declare function phaseGenerateAdvance(cpl: ComponentCompilation): void;
