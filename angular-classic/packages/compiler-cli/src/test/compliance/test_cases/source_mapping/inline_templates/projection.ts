import {Component} from '@angular-classic/core';

@Component({
  selector: 'test-cmp',
  template: `
  <h3><ng-content select="title"></ng-content></h3>
  <div><ng-content></ng-content></div>`
})
export class TestCmp {
}
