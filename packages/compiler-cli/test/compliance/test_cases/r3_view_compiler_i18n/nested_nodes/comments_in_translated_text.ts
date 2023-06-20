import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n>Some <!-- comments --> text</div>
  `
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}