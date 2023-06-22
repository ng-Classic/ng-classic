import {Directive, Input, NgModule, Output} from '@angular-classic/core';

@Directive({selector: '[my-directive]'})
export class MyDirective {
  @Input() directiveInput: any;
  @Input('renamedDirectiveInput') originalDirectiveInput: any;

  @Output() directiveOutput: any;
  @Output('renamedDirectiveOutput') originalDirectiveOutput: any;
}

@NgModule({declarations: [MyDirective]})
export class MyModule {
}
