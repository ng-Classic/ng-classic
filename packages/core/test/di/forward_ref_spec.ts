/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Type} from '@angular-classic/core';
import {forwardRef, resolveForwardRef} from '@angular-classic/core/src/di';

{
  describe('forwardRef', function() {
    it('should wrap and unwrap the reference', () => {
      const ref = forwardRef(() => String);
      expect(ref instanceof Type).toBe(true);
      expect(resolveForwardRef(ref)).toBe(String);
    });
  });
}
