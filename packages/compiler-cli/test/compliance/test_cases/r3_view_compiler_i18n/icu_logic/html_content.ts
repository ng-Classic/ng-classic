import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n>
    {gender, select, male {male - <b>male</b>} female {female <b>female</b>} other {<div class="other"><i>other</i></div>}}
    <b>Other content</b>
    <div class="other"><i>Another content</i></div>
  </div>
`
})
export class MyComponent {
  gender = 'female';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
