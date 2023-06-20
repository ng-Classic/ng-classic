import {Component} from '@angular-classic/core';

@Component({template: '<div (click)="c($event)"></div>'})
class Comp {
  c(event: any) {}
}
