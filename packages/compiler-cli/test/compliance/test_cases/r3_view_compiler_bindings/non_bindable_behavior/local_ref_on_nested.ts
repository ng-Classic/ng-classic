import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-app',
  template: `
    <div ngNonBindable>
    <input value="one" #myInput> {{ myInput.value }}
    </div>
  `
})
export class MyComponent {
  name = 'John Doe';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
