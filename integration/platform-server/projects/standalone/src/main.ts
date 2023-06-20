import {bootstrapApplication} from '@angular-classic/platform-browser';
import {appConfig} from './app/app.config';
import {AppComponent} from './app/app.component';

(window as any)['doBootstrap'] = () => {
  bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
};
