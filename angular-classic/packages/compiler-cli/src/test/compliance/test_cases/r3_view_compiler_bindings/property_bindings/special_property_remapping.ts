import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <label [for]="forValue"></label>`
})
export class MyComponent {
  forValue = 'some-input';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
