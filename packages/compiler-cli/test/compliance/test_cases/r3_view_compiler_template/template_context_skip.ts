import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
    <div *ngFor="let outer of items">
      <div *ngFor="let middle of outer.items">
        <div *ngFor="let inner of middle.items">
          {{ middle.value }} - {{ name }}
        </div>
      </div>
    </div>`
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
