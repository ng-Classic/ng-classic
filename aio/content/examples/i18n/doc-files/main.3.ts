// #docregion
import { MissingTranslationStrategy } from '@angular-classic/core';
import { platformBrowserDynamic } from '@angular-classic/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// ...

platformBrowserDynamic().bootstrapModule(AppModule, {
  missingTranslation: MissingTranslationStrategy.Error,
  providers: [
    // ...
  ]
});
