import {Component, NgModule} from '@angular-classic/core';

@Component({selector: 'my-app', template: `<div>My App</div>`})
export class MyApp {
}

@Component({selector: 'my-component', template: `<my-app (click)="onClick($event);"></my-app>`})
export class MyComponent {
  onClick(event: any) {}
}

@NgModule({declarations: [MyComponent, MyApp]})
export class MyModule {
}
