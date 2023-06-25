import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n>
    Named interpolation: {{ valueA // i18n(ph="PH_A") }}
    Named interpolation with spaces: {{ valueB // i18n(ph="PH B") }}
  </div>
`,
})
export class MyComponent {
  valueA = '';
  valueB = '';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
