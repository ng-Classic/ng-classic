import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: '<ng-container><span>in a </span>container</ng-container>'
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
