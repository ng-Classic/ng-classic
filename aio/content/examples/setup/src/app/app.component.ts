// #docregion
import { Component } from '@angular-classic/core';

@Component({
  selector: 'app-root',
  template: '<h1>Hello {{name}}</h1>'
})
export class AppComponent { name = 'Angular'; }
