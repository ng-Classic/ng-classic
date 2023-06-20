import {Component, NgModule} from '@angular-classic/core';

@Component({selector: 'my-component', template: '<div [id]="id"></div>'})
export class MyComponent {
  id = 'one';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
