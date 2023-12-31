import {Component, NgModule} from '@angular-classic/core';

@Component({
  template: `
    <div (click)="_handleClick({a, b: 2, c})"></div>
  `
})
export class MyComponent {
  a = 1;
  c = 3;
  _handleClick(_value: any) {}
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
