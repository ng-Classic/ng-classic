import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n="meaningA|descA@@idA">{count, select, 1 {one} other {more than one}}</div>
`
})
export class MyComponent {
  count = 1;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
