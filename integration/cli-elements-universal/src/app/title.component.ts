import { Component, Input } from '@angular-classic/core';

@Component({
  selector: 'app-title',
  template: '<h1>{{ appName }} app is running!</h1>',
})
export class TitleComponent {
  @Input() appName = 'Unknown';
}
