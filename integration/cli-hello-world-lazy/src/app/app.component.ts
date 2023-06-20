import {CommonModule} from '@angular-classic/common';
import {Component} from '@angular-classic/core';
import {RouterOutlet} from '@angular-classic/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
})
export class AppComponent {
  title = 'cli-hello-world-lazy';
}
