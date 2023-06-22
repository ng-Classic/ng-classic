import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `<div (click)="click()" (change)="change()"></div>`,
})
export class MyComponent {
  click() {}
  change() {}
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
