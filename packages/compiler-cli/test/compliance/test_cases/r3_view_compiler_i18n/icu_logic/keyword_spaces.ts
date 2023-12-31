import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n>
    {count, select , 1 {one} other {more than one}}
    {count, plural , =1 {one} other {more than one}}
  </div>
`
})
export class MyComponent {
  count = 0;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
