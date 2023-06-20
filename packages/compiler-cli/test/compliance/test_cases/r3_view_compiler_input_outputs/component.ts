import {Component, Input, NgModule, Output} from '@angular-classic/core';

@Component({selector: 'my-component', template: ''})
export class MyComponent {
  @Input() componentInput: any;
  @Input('renamedComponentInput') originalComponentInput: any;

  @Output() componentOutput: any;
  @Output('renamedComponentOutput') originalComponentOutput: any;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
