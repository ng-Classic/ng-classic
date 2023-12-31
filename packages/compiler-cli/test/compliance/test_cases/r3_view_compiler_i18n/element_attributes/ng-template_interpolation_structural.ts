import {Component, NgModule, Pipe} from '@angular-classic/core';

@Pipe({name: 'uppercase'})
export class UppercasePipe {
  transform(v: any) {}
}

@Component({
  selector: 'my-component',
  template: `
  <ng-template *ngIf="true" i18n-title title="Hello {{ name }}"></ng-template>
`
})
export class MyComponent {
  name = '';
}

@NgModule({declarations: [UppercasePipe, MyComponent]})
export class MyModule {
}
