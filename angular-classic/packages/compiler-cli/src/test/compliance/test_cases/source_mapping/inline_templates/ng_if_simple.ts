import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: '<div *ngIf="showMessage()">{{ name }}</div>',
})
export class TestCmp {
}
