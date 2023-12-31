import {Component, Input, NgModule} from '@angular-classic/core';

@Component({selector: 'some-comp', template: ''})
export class SomeComp {
  @Input() prop!: any;
  @Input() otherProp!: any;
}

@Component({template: '<some-comp [prop]="{}" [otherProp]="{a: 1, b: 2}"></some-comp>'})
export class MyApp {
}

@NgModule({declarations: [SomeComp, MyApp]})
export class MyMod {
}
