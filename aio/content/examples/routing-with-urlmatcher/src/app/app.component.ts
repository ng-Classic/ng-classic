import { Component, VERSION } from '@angular-classic/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  name = 'Angular Classic ' + VERSION.major;
}
