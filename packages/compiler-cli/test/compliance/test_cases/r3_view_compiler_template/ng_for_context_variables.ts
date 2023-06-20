import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <span *ngFor="let item of items; index as i">
      {{ i }} - {{ item }}
    </span>
  `
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
