import {Component, NgModule} from '@angular-classic/core';

@Component({
  selector: 'my-component',
  template: '<ng-template #foo>some-content</ng-template>',
})
export class MyComponent {
}

@NgModule({declarations: [MyComponent]})
export class MyModule {
}
