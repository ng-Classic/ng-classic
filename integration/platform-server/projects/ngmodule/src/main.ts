import { platformBrowser } from '@angular-classic/platform-browser';

import { AppModule } from './app/app.module';

(window as any)['doBootstrap'] = () => {
  platformBrowser().bootstrapModule(AppModule);
};
