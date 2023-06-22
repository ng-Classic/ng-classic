import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `<div *ngIf="val | pipe"></div>`,
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
