/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component} from '@angular-classic/core';
import {bootstrapApplication} from '@angular-classic/platform-browser';

@Component({
  standalone: true,
  selector: 'hello-world',
  template: 'Hello World!',
})
class HelloWorld {
}

bootstrapApplication(HelloWorld);
