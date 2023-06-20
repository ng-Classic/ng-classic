import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: '<div [title]="name"></div>',
})
export class TestCmp {
  name: string = '';
}
