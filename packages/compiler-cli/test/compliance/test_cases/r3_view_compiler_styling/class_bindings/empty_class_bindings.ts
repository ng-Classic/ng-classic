import {Component, NgModule} from '@angular-classic/core';

@Component({selector: 'my-component', template: `<div [class.color]></div>`})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
