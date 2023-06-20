import { Component } from '@angular-classic/core';
import { CommonModule } from '@angular-classic/common';
import { RouterOutlet } from '@angular-classic/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  template: '<router-outlet></router-outlet>',

})
export class AppComponent {
}
