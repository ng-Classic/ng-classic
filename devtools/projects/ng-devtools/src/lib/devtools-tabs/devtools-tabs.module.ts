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
import {MatLegacyMenuModule as MatMenuModule} from '@angular-classic/material/legacy-menu';
import {MatLegacySlideToggleModule as MatSlideToggleModule} from '@angular-classic/material/legacy-slide-toggle';
import {MatLegacyTabsModule as MatTabsModule} from '@angular-classic/material/legacy-tabs';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular-classic/material/legacy-tooltip';

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
