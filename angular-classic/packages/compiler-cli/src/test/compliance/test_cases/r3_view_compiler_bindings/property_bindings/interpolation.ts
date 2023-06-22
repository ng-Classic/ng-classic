import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <a title="Hello {{name}}"></a>`
})
export class MyComponent {
  name = 'World';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
