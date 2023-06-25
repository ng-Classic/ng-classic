import {Component} from '@angular-classic/core';

@Component({selector: 'my-app', template: '<div *ngIf="show" ngProjectAs=".someclass"></div>'})
export class MyApp {
  show = true;
}
