/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {CommonModule} from '@angular-classic/common';
import {NgModule} from '@angular-classic/core';
import {MatLegacyCardModule as MatCardModule} from '@angular-classic/material/legacy-card';
import {MatLegacyTooltipModule as MatTooltipModule} from '@angular-classic/material/legacy-tooltip';
import {MatToolbarModule} from '@angular-classic/material/toolbar';
import {NgxFlamegraphModule} from 'ngx-flamegraph';

import {AngularSplitModule} from '../../../../vendor/angular-split/public_api';

import {BarChartComponent} from './bar-chart.component';
import {BargraphVisualizerComponent} from './bargraph-visualizer.component';
import {ExecutionDetailsComponent} from './execution-details.component';
import {FlamegraphVisualizerComponent} from './flamegraph-visualizer.component';
import {TimelineVisualizerComponent} from './timeline-visualizer.component';
import {TreeMapVisualizerComponent} from './tree-map-visualizer.component';

@NgModule({
  declarations: [
    ExecutionDetailsComponent,
    BarChartComponent,
    TimelineVisualizerComponent,
    FlamegraphVisualizerComponent,
    TreeMapVisualizerComponent,
    BargraphVisualizerComponent,
  ],
  imports: [
    CommonModule, NgxFlamegraphModule, MatTooltipModule, MatToolbarModule, MatCardModule,
    AngularSplitModule
  ],
  exports: [TimelineVisualizerComponent],
})
export class RecordingVisualizerModule {
}
