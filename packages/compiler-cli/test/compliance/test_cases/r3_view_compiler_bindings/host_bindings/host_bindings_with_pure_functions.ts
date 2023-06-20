import {Component, NgModule} from '@angular-classic/core';

@Component({selector: 'host-binding-comp', host: {'[id]': '["red", id]'}, template: ''})
export class HostBindingComp {
  id = 'some id';
}

@NgModule({declarations: [HostBindingComp]})
export class MyModule {
}
