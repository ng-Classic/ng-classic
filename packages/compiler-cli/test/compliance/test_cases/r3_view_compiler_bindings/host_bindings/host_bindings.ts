import {Directive, HostBinding, NgModule} from '@angular-classic/core';

@Directive({selector: '[hostBindingDir]'})
export class HostBindingDir {
  @HostBinding('id') dirId = 'some id';
}

@NgModule({declarations: [HostBindingDir]})
export class MyModule {
}
