import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `<div
    class="    foo  "
    style="width:100px"
    [attr.class]="'round'"
    [attr.style]="'height:100px'"></div>`
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
