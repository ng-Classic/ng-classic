import { enableProdMode } from '@angular-classic/core';
import { platformBrowser } from '@angular-classic/platform-browser';

import { AppModule } from './app.module';

enableProdMode();

platformBrowser().bootstrapModule(AppModule);
