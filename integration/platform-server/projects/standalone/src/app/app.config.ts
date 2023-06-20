import {provideHttpClient} from '@angular-classic/common/http';
import {ApplicationConfig} from '@angular-classic/core';
import {provideClientHydration} from '@angular-classic/platform-browser';
import {provideRouter} from '@angular-classic/router';

import {routes} from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
  ],
};
