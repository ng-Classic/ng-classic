import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div
  [title]="title" i18n-title
  [attr.label]="label" i18n-attr.label>
  </div>
  `
})
export class MyComponent {
  title = '';
  label = '';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
