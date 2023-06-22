/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentCompilation } from '../compilation';
/**
 * Replace sequences of mergable elements (e.g. `ElementStart` and `ElementEnd`) with a consolidated
 * element (e.g. `Element`).
 */
export declare function phaseEmptyElements(cpl: ComponentCompilation): void;
