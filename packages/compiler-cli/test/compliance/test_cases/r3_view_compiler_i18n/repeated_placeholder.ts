import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <div i18n>Hello, {{ placeholder }}! You are a very good {{ placeholder }}.</div>
    <div i18n>Hello, {{ placeholder // i18n(ph = "ph") }}! Hello again {{ placeholder // i18n(ph = "ph") }}.</div>
  `,
})
export class MyComponent {
  placeholder: any;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
