import { Component } from '@angular-classic/core';

@Component({
  selector: 'app-root',
  template: '<app-title-ce [appName]="title"></app-title-ce>',
})
export class AppComponent {
  title = 'cli-elements-universal';
}
