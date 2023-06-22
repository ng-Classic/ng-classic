import {Directive, HostBinding, NgModule} from '@angular-classic/core';

@Directive({selector: '[hostBindingDir]'})
export class HostBindingDir {
  @HostBinding('class.a') 'is-a': any;
  @HostBinding('class.b') 'is-"b"': any;
  @HostBinding('class.c') '"is-c"': any;
}

@NgModule({declarations: [HostBindingDir]})
export class MyModule {
}
