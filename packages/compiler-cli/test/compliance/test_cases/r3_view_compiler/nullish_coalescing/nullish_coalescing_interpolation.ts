import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-app',
  template: `
    <div>Hello, {{ firstName ?? 'Frodo' }}!</div>
    <span>Your last name is {{ lastName ?? lastNameFallback ?? 'unknown' }}</span>
  `
})
export class MyApp {
  firstName: string|null = null;
  lastName: string|null = null;
  lastNameFallback = 'Baggins';
}

@NgModule({declarations: [MyApp]})
export class MyModule {
}
