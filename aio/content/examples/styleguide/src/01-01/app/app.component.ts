// #docregion
import { Component } from '@angular-classic/core';

import { HeroService } from './heroes';

@Component({
  selector: 'toh-app',
  template: `
      <toh-heroes></toh-heroes>
    `,
  styleUrls: ['./app.component.css'],
  providers: [HeroService]
})
export class AppComponent {}
