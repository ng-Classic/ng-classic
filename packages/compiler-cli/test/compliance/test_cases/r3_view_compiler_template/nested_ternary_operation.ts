import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    {{a?.b ? 1 : 2 }}`,
})
export class MyComponent {
  a!: any;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
