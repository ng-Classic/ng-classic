import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: `
    <ng-template [ngIf]="showMessage()">
      <div>{{ name }}</div>
      <hr>
    </ng-template>`
})
export class TestCmp {
}
