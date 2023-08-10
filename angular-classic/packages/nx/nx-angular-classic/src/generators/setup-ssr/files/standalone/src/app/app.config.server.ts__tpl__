import { mergeApplicationConfig, ApplicationConfig } from '@angular-classic/core';
import { provideServerRendering } from '@angular-classic/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
