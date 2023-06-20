import {Component, NgModule} from '@angular-classic/core';

@Component({
  template: `
    {{ val?.foo!.bar }}
    {{ val?.[0].foo!.bar }}
    {{ foo(val)?.foo!.bar }}
    {{ $any(val)?.foo!.bar }}
  `
})
export class MyApp {
  val: any = null;

  foo(val: unknown) {
    return val;
  }
}

@NgModule({declarations: [MyApp]})
export class MyModule {
}
