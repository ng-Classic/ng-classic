import {Component} from '@angular-classic/core';

@Component(
    {template: '<ng-template [title]="myTitle" [id]="buttonId" [tabindex]="1"></ng-template>'})
export class MyComponent {
  myTitle = 'hello';
  buttonId = 'custom-id';
}
