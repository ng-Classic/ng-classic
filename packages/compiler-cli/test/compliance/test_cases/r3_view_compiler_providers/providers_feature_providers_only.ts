import {Component, NgModule} from '@angular-classic/core';

abstract class Greeter {
  abstract greet(): string;
}

class GreeterEN implements Greeter {
  greet() {
    return 'Hi';
  }
}

@Component({
  selector: 'my-component',
  template: '<div></div>',
  providers: [GreeterEN, {provide: Greeter, useClass: GreeterEN}]
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
