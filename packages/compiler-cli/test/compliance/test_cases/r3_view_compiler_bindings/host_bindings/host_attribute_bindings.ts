import {Directive, NgModule} from '@angular-classic/core';

@Directive({selector: '[hostAttributeDir]', host: {'[attr.required]': 'required'}})
export class HostAttributeDir {
  required = true;
}

@NgModule({declarations: [HostAttributeDir]})
export class MyModule {
}
