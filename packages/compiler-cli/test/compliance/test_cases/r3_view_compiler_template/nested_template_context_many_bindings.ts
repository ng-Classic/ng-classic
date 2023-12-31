import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <div *ngFor="let d of _data; let i = index" (click)="_handleClick(d, i)"></div>
  `
})
export class MyComponent {
  _data = [1, 2, 3];
  _handleClick(d: any, i: any) {}
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
