import {Component, NgModule, Pipe} from '@angular-classic/core';

@Pipe({name: 'async'})
export class AsyncPipe {
  transform(v: any): null|any {}
}

// https://github.com/ng-classic/ng-classic/issues/37194
// Verifies that temporary expressions used for expressions with potential side-effects in
// the LHS of a safe navigation access are emitted within the binding expression itself, to
// ensure that these temporaries are evaluated during the evaluation of the binding. This
// is important for when the LHS contains a pipe, as pipe evaluation depends on the current
// binding index.
@Component({
  template:
      '<button [title]="myTitle" [id]="(auth().identity() | async)?.id" [tabindex]="1"></button>'
})
export class MyComponent {
  myTitle = 'hello';
  auth!: () => {
    identity(): any;
  };
}

@NgModule({declarations: [MyComponent, AsyncPipe]})
export class MyMod {
}
