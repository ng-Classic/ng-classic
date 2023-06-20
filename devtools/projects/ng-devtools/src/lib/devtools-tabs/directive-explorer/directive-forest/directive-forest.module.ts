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
import {MatIconModule} from '@angular-classic/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular-classic/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular-classic/material/legacy-card';

import {BreadcrumbsModule} from './breadcrumbs/breadcrumbs.module';
import {DirectiveForestComponent} from './directive-forest.component';
import {FilterModule} from './filter/filter.module';

@NgModule({
  declarations: [DirectiveForestComponent],
  imports: [
    CommonModule,
    BreadcrumbsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    FilterModule,
    ScrollingModule,
  ],
  exports: [DirectiveForestComponent, BreadcrumbsModule],
})
export class DirectiveForestModule {
}
