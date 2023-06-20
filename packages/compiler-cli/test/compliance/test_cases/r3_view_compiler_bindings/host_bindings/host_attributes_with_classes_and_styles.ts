import {Component, Directive, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-host-attribute-component',
  template: '...',
  host: {'title': 'hello there from component', 'style': 'opacity:1'}
})
export class HostAttributeComp {
}

@Directive({
  selector: '[hostAttributeDir]',
  host: {
    'style': 'width: 200px; height: 500px',
    '[style.opacity]': 'true',
    'class': 'one two',
    '[class.three]': 'true',
    'title': 'hello there from directive',
  }
})
export class HostAttributeDir {
}

@NgModule({declarations: [HostAttributeComp, HostAttributeDir]})
export class MyModule {
}
