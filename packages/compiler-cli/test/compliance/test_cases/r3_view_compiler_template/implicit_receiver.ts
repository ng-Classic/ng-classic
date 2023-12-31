import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <div *ngIf="true" (click)="greet(this)"></div>
    <div *ngIf="true" [id]="this"></div>
  `
})
export class MyComponent {
  greet(val: any) {}
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
