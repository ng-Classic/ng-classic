import {Component, NgModule, ViewEncapsulation} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  encapsulation: ViewEncapsulation.None,
  styles: ['div.tall { height: 123px; }', ':host.small p { height:5px; }'],
  template: '...'
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
