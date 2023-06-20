import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <div title="hi"></div>
    <span title="hi"></span>
  `
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
