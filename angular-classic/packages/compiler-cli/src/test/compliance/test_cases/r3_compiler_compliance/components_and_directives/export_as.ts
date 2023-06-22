import {Directive, NgModule} from '@angular-classic/core';

@Directive({selector: '[some-directive]', exportAs: 'someDir, otherDir'})
export class SomeDirective {
}

@NgModule({declarations: [SomeDirective]})
export class MyModule {
}
