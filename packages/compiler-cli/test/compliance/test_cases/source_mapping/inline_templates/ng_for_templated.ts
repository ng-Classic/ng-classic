import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: `<ng-template ngFor [ngForOf]="items" let-item>{{ item }}</ng-template>`
})
export class TestCmp {
}
