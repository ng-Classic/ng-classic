import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <ng-template>{gender, select, male {male} female {female} other {other}}</ng-template>
  <ng-container>{age, select, 10 {ten} 20 {twenty} other {other}}</ng-container>
`,
})
export class MyComponent {
  age = 0;
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
