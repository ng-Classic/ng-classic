/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {MatExpansionModule} from '@angular-classic/material/expansion';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular-classic/material/legacy-button';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular-classic/material/legacy-tooltip';

import {ComponentMetadataComponent} from './component-metadata.component';
import {PropertyTabHeaderComponent} from './property-tab-header.component';
import {PropertyTabComponent} from './property-tab.component';
import {PropertyViewModule} from './property-view/property-view.module';

@NgModule({
  declarations: [PropertyTabComponent, PropertyTabHeaderComponent, ComponentMetadataComponent],
  imports: [
    PropertyViewModule, CommonModule, MatButtonModule, MatExpansionModule, MatIconModule,
    MatTooltipModule
  ],
  exports: [PropertyTabComponent],
})
export class PropertyTabModule {
}
