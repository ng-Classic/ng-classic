import {Component} from '@angular-classic/core';

@Component({template: '<button [title]="myTitle" [id]="buttonId" [tabindex]="1"></button>'})
export class MyComponent {
  myTitle = 'hello';
  buttonId = 'special-button';
}
