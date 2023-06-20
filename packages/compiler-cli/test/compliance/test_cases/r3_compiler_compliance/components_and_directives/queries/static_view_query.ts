import {Component, ElementRef, NgModule, ViewChild} from '@angular-classic/core';

import {SomeDirective} from './some.directive';

@Component({
  selector: 'view-query-component',
  template: `
    <div someDir></div>
  `
})
export class ViewQueryComponent {
  @ViewChild(SomeDirective, {static: true}) someDir!: SomeDirective;
  @ViewChild('foo') foo!: ElementRef;
}

@NgModule({declarations: [SomeDirective, ViewQueryComponent]})
export class MyModule {
}
