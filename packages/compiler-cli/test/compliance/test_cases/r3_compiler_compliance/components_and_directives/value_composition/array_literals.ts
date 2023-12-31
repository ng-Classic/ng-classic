import {Component, Input, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-comp',
  template: `
    <p>{{ names[0] }}</p>
    <p>{{ names[1] }}</p>
  `
})
export class MyComp {
  @Input() names!: string[];
}

@Component({
  selector: 'my-app',
  template: `
  <my-comp [names]="['Nancy', customName]"></my-comp>
`
})
export class MyApp {
  customName = 'Bess';
}

@NgModule({declarations: [MyComp, MyApp]})
export class MyModule {
}
