/*
*  Protractor support is deprecated in Angular.
*  Protractor is used in this example for compatibility with Angular Classic documentation tools.
*/
import { bootstrapApplication,provideProtractorTestingSupport } from '@angular-classic/platform-browser';
import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular-classic/router';
import routeConfig from './app/routes';

bootstrapApplication(AppComponent,
  {
    providers: [
      provideProtractorTestingSupport(),
      provideRouter(routeConfig)
    ]
  }
).catch(err => console.error(err));
