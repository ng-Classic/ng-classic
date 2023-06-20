import {bootstrapApplication, provideProtractorTestingSupport} from '@angular-classic/platform-browser';
import {provideRouter} from '@angular-classic/router';

import {AppComponent} from './app/app.component';
import {appRoutes} from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideRouter(appRoutes),
    provideProtractorTestingSupport(),
  ]
}).catch(console.error);
