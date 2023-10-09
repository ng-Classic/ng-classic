/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ScrollingModule} from '@angular-classic/cdk/scrolling';
import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {MatButtonModule} from '@angular-classic/material/button';
import {MatCardModule} from '@angular-classic/material/card';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatSnackBarModule} from '@angular-classic/material/snack-bar';
import {MatTooltipModule} from '@angular-classic/material/tooltip';
import {MatTreeModule} from '@angular-classic/material/tree';

import {AngularSplitModule} from '../../vendor/angular-split/public_api';

import {DirectiveExplorerComponent} from './directive-explorer.component';
import {DirectiveForestModule} from './directive-forest/directive-forest.module';
import {PropertyTabModule} from './property-tab/property-tab.module';

@NgModule({
  declarations: [DirectiveExplorerComponent],
  exports: [DirectiveExplorerComponent],
  imports: [
    MatTreeModule,
    MatCardModule,
    ScrollingModule,
    MatIconModule,
    CommonModule,
    PropertyTabModule,
    MatButtonModule,
    MatSnackBarModule,
    AngularSplitModule,
    DirectiveForestModule,
    MatTooltipModule,
  ],
})
export class DirectiveExplorerModule {
}
