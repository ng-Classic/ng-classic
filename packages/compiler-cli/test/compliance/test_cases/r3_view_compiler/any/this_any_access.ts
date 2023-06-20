import {Component} from '@angular-classic/core';

@Component({template: '<div [tabIndex]="this.$any(null)"></div>'})
class Comp {
  $any(value: null): any {
    return value as any;
  }
}
