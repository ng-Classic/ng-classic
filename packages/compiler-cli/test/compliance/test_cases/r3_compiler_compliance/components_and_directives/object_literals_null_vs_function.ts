import {Component, NgModule} from '@angular-classic/core';

@Component({
  template: `
    <div [dir]="{foo: null}"></div>
    <div [dir]="{foo: getFoo()}"></div>
  `
})
export class MyApp {
  getFoo() {
    return 'foo!';
  }
}

@NgModule({declarations: [MyApp]})
export class MyModule {
}
