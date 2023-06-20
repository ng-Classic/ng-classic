/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Injectable} from '@angular-classic/core';
import {MySecondService} from './second';

@Injectable({providedIn: 'root'})
export class MyService {
  constructor(public secondService: MySecondService) {}
}
