import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <div>Hello {{ name }}</div>`
})
export class MyComponent {
  name = 'World';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
