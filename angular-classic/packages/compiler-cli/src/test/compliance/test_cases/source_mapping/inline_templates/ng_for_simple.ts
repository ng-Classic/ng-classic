import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: '<div *ngFor="let item of items; index as i; trackBy: trackByFn">{{ item }}</div>'
})
export class TestCmp {
}
