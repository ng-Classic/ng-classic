import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'a-component',
  template: `
    <ng-content *ngIf="show"></ng-content>
  `,
})
export class AComponent {
  show = true;
}

@Component({
  selector: 'b-component',
  template: `
    <ng-content *ngIf="show"></ng-content>
  `,
})
export class BComponent {
  show = true;
}

@NgModule({declarations: [AComponent, BComponent]})
export class AModule {
}
