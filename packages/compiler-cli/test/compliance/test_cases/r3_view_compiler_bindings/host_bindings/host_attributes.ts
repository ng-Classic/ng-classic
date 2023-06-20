import {Directive, NgModule} from '@angular-classic/core';

@Directive({selector: '[hostAttributeDir]', host: {'aria-label': 'label'}})
export class HostAttributeDir {
}

@NgModule({declarations: [HostAttributeDir]})
export class MyModule {
}
