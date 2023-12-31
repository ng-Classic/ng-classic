import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-app',
  template: `<a
    target="_blank"
    [title]="1"
    [attr.foo]="'one'"
    (customEvent)="doThings()"
    [attr.bar]="'two'"
    [id]="2"
    aria-label="link"
    [attr.baz]="three"></a>`
})
export class MyComponent {
  doThings() {}
  three!: any;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
