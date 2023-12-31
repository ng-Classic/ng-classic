import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-app',
  template: `
    <b ngNonBindable #myRef id="my-id">
    <i>Hello {{ name }}!</i>
    </b>
    {{ myRef.id }}
  `
})
export class MyComponent {
  name = 'John Doe';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
