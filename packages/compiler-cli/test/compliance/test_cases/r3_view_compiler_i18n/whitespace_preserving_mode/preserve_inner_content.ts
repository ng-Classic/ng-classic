import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n>
    Some text
    <span>Text inside span</span>
  </div>
`,
  preserveWhitespaces: true,
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}