/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular-classic/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular-classic/material/legacy-card';

import {FilterComponent} from './filter.component';

@NgModule({
  declarations: [FilterComponent],
  imports: [CommonModule, MatCardModule, MatIconModule, MatButtonModule],
  exports: [FilterComponent],
})
export class FilterModule {
}
