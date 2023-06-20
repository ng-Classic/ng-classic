/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {XhrFactory} from '@angular-classic/common';
import {Injectable} from '@angular-classic/core';

/**
 * A factory for `HttpXhrBackend` that uses the `XMLHttpRequest` browser API.
 */
@Injectable()
export class BrowserXhr implements XhrFactory {
  build(): XMLHttpRequest {
    return new XMLHttpRequest();
  }
}
