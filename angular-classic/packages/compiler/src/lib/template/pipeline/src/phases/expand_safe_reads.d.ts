/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ComponentCompilation } from '../compilation';
/**
 * Finds all unresolved safe read expressions, and converts them into the appropriate output AST
 * reads, guarded by null checks.
 */
export declare function phaseExpandSafeReads(cpl: ComponentCompilation): void;
