import {Component, NgModule} from '@angular-classic/core';

@Component({
  template: `
    <ng-content></ng-content>
    <ng-content select="[spacer]"></ng-content>
    <ng-content></ng-content>
  `,
})
class Cmp {
}

@NgModule({declarations: [Cmp]})
class Module {
}
