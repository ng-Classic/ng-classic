/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {MatButtonModule} from '@angular-classic/material/button';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatMenuModule} from '@angular-classic/material/menu';
import {MatSlideToggleModule} from '@angular-classic/material/slide-toggle';
import {MatTabsModule} from '@angular-classic/material/tabs';
import {MatTooltipModule} from '@angular-classic/material/tooltip';

import {DevToolsTabsComponent} from './devtools-tabs.component';
import {DirectiveExplorerModule} from './directive-explorer/directive-explorer.module';
import {ProfilerModule} from './profiler/profiler.module';
import {RouterTreeModule} from './router-tree/router-tree.module';
import {TabUpdate} from './tab-update/index';

@NgModule({
  declarations: [DevToolsTabsComponent],
  imports: [
    MatTabsModule,
    MatIconModule,
    DirectiveExplorerModule,
    ProfilerModule,
    RouterTreeModule,
    CommonModule,
    MatMenuModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatTooltipModule,
  ],
  providers: [TabUpdate],
  exports: [DevToolsTabsComponent],
})
export class DevToolsTabModule {
}
