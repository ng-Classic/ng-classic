import {Directive, NgModule} from '@angular-classic/core';

@Directive({selector: '[hostBindingDir]', host: {'[id]': 'getData()?.id'}})
export class HostBindingDir {
  getData?: () => {
    id: number
  };
}

@NgModule({declarations: [HostBindingDir]})
export class MyModule {
}
