import {Component, NgModule, Pipe} from '@angular-classic/core';

@Pipe({name: 'uppercase'})
export class UppercasePipe {
  transform(v: any) {}
}

@Component({
  selector: 'my-component',
  template: `
  <div i18n>
    My i18n block #{{ one }}
    <span>Plain text in nested element</span>
  </div>
  <div i18n>
    My i18n block #{{ two | uppercase }}
    <div>
      <div>
        <span>
          More bindings in more nested element: {{ nestedInBlockTwo }}
        </span>
      </div>
    </div>
  </div>
`,
})
export class MyComponent {
  one = 1;
  two = 2;
  nestedInBlockTwo = '';
}

@NgModule({declarations: [MyComponent, UppercasePipe]})
export class MyModule {
}
