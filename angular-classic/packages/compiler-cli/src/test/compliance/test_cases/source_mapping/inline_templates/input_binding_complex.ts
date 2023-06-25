import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: '<div [title]="greeting + name"></div>',
})
export class TestCmp {
  greeting: string = '';
  name: string = '';
}
