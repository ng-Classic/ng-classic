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
import {FormsModule} from '@angular-classic/forms';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatLegacyButtonModule as MatButtonModule} from '@angular-classic/material/legacy-button';
import {MatLegacyCardModule as MatCardModule} from '@angular-classic/material/legacy-card';
import {MatLegacyCheckboxModule as MatCheckboxModule} from '@angular-classic/material/legacy-checkbox';
import {MatLegacyDialogModule as MatDialogModule} from '@angular-classic/material/legacy-dialog';
import {MatLegacyInputModule as MatInputModule} from '@angular-classic/material/legacy-input';
import {MatLegacyProgressBarModule as MatProgressBarModule} from '@angular-classic/material/legacy-progress-bar';
import {MatLegacySelectModule as MatSelectModule} from '@angular-classic/material/legacy-select';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular-classic/material/legacy-tooltip';
import {NgxFlamegraphModule} from 'ngx-flamegraph';

import {FrameSelectorComponent} from './frame-selector.component';
import {RecordingDialogComponent} from './recording-dialog.component';
import {RecordingModalComponent} from './recording-modal.component';
import {RecordingVisualizerModule} from './recording-visualizer/recording-visualizer.module';
import {TimelineControlsComponent} from './timeline-controls.component';
import {TimelineComponent} from './timeline.component';

@NgModule({
  declarations: [
    TimelineComponent,
    TimelineControlsComponent,
    RecordingModalComponent,
    RecordingDialogComponent,
    FrameSelectorComponent,
  ],
  imports: [
    ScrollingModule,
    CommonModule,
    FormsModule,
    RecordingVisualizerModule,
    MatCheckboxModule,
    MatDialogModule,
    MatProgressBarModule,
    MatButtonModule,
    MatTooltipModule,
    MatIconModule,
    MatCardModule,
    MatInputModule,
    NgxFlamegraphModule,
    MatSelectModule,
  ],
  exports: [
    TimelineComponent,
    TimelineControlsComponent,
    RecordingModalComponent,
    RecordingDialogComponent,
    FrameSelectorComponent,
  ],
})
export class TimelineModule {
}
