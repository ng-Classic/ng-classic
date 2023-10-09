import { ApplicationConfig } from '@angular-classic/core';
import { routes } from './app.routes';
import { provideRouter } from '@angular-classic/router';
import { provideProtractorTestingSupport } from '@angular-classic/platform-browser';
import { provideAnimations } from '@angular-classic/platform-browser/animations';


export const appConfig: ApplicationConfig = {
    providers: [
        // needed for supporting e2e tests
        provideProtractorTestingSupport(),
        provideRouter(routes),
        provideAnimations(),
    ]
};
