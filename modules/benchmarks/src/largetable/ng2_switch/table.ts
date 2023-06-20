/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {Component, Input, NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';

import {emptyTable, TableCell} from '../util';

@Component({
  selector: 'largetable',
  template: `<table><tbody>
    <tr *ngFor="let row of data; trackBy: trackByIndex">
    <ng-template ngFor [ngForOf]="row" [ngForTrackBy]="trackByIndex" let-cell><ng-container [ngSwitch]="cell.row % 2">
        <td *ngSwitchCase="0" style="background-color: grey">{{cell.value}}</td><td *ngSwitchDefault>{{cell.value}}</td>
    </ng-container></ng-template>
    </tr>
  </tbody></table>`
})
export class TableComponent {
  @Input() data: TableCell[][] = emptyTable;

  trackByIndex(index: number, item: any) {
    return index;
  }
}

@NgModule({imports: [BrowserModule], bootstrap: [TableComponent], declarations: [TableComponent]})
export class AppModule {
}
