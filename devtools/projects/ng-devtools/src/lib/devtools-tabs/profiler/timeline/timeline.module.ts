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
import {MatButtonModule} from '@angular-classic/material/button';
import {MatCardModule} from '@angular-classic/material/card';
import {MatCheckboxModule} from '@angular-classic/material/checkbox';
import {MatDialogModule} from '@angular-classic/material/dialog';
import {MatIconModule} from '@angular-classic/material/icon';
import {MatInputModule} from '@angular-classic/material/input';
import {MatProgressBarModule} from '@angular-classic/material/progress-bar';
import {MatSelectModule} from '@angular-classic/material/select';
import {MatTooltipModule} from '@angular-classic/material/tooltip';
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
