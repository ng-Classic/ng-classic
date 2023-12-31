import {Component, NgModule} from '@angular-classic/core';

@Component({
  template: `
    <ng-content select="[id=toMainBefore]"></ng-content>
    <ng-template>
      <ng-content select="[id=toTemplate]"></ng-content>
      <ng-template>
        <ng-content select="[id=toNestedTemplate]"></ng-content>
      </ng-template>
    </ng-template>
    <ng-template>
      '*' selector in a template: <ng-content></ng-content>
    </ng-template>
    <ng-content select="[id=toMainAfter]"></ng-content>
  `,
})
class Cmp {
}

@NgModule({declarations: [Cmp]})
class Module {
}
