import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: '<h3>Hello {{ name }}</h3>',
})
export class TestCmp {
  name: string = '';
}
