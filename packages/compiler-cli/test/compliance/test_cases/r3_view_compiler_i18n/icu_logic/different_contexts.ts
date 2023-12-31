import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: `
  <div i18n>
  {gender, select, male {male} female {female} other {other}}
  <span *ngIf="ageVisible">
    {age, select, 10 {ten} 20 {twenty} 30 {thirty} other {other}}
  </span>
</div>
`
})
export class MyComponent {
  gender = 'female';
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
