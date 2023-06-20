import {Component} from '@angular-classic/core';

@Component({
  template: `
    <button
      [title]="myTitle"
      [@expand]="expansionState"
      [tabindex]="1"
      [@fade]="'out'"></button>
    `
})
export class MyComponent {
  expansionState = 'expanded';
  myTitle = '';
}
