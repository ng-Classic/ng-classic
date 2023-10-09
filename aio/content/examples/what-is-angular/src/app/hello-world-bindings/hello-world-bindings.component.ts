import { Component } from '@angular-classic/core';

@Component ({
  selector: 'hello-world-bindings',
  templateUrl: './hello-world-bindings.component.html'
})
export class HelloWorldBindingsComponent {
  fontColor = 'blue';
  sayHelloId = 1;
  canClick = true;
  message = 'Hello, World';

// #docregion method
  sayMessage() {
    alert(this.message);
  }
// #enddocregion
}
