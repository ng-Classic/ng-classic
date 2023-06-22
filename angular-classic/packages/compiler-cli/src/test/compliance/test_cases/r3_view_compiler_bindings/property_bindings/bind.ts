import {Component, NgModule} from '@angular-classic/core';

@Component({selector: 'my-app', template: '<a [title]="title"></a>'})
export class MyComponent {
  title = 'Hello World';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
