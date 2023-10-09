/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DragDropModule} from '@angular-classic/cdk/drag-drop';
import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {FormsModule} from '@angular-classic/forms';
import {MatButtonModule} from '@angular-classic/material/button';
import {MatExpansionModule} from '@angular-classic/material/expansion';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatToolbarModule} from '@angular-classic/material/toolbar';
import {MatTooltipModule} from '@angular-classic/material/tooltip';
import {MatTreeModule} from '@angular-classic/material/tree';

import {PropertyEditorComponent} from './property-editor.component';
import {PropertyPreviewComponent} from './property-preview.component';
import {PropertyTabBodyComponent} from './property-tab-body.component';
import {PropertyViewBodyComponent} from './property-view-body.component';
import {PropertyViewHeaderComponent} from './property-view-header.component';
import {PropertyViewTreeComponent} from './property-view-tree.component';
import {PropertyViewComponent} from './property-view.component';

@NgModule({
  declarations: [
    PropertyViewComponent,
    PropertyViewTreeComponent,
    PropertyViewHeaderComponent,
    PropertyViewBodyComponent,
    PropertyTabBodyComponent,
    PropertyPreviewComponent,
    PropertyEditorComponent,
  ],
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTreeModule,
    MatTooltipModule,
    CommonModule,
    MatExpansionModule,
    DragDropModule,
    FormsModule,
  ],
  exports: [
    PropertyViewComponent,
    PropertyViewTreeComponent,
    PropertyViewHeaderComponent,
    PropertyViewBodyComponent,
    PropertyTabBodyComponent,
    PropertyPreviewComponent,
    PropertyEditorComponent,
  ],
})
export class PropertyViewModule {
}
