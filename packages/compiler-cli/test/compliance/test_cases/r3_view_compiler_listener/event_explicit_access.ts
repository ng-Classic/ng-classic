import {Component} from '@angular-classic/core';

@Component({template: '<div (click)="c(this.$event)"></div>'})
class Comp {
  $event = {};

  c(value: {}) {}
}
