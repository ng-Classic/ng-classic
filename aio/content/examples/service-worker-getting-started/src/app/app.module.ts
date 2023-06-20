import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule, isDevMode } from '@angular-classic/core';
import { AppComponent } from './app.component';

import { ServiceWorkerModule } from '@angular-classic/service-worker';

import { CheckForUpdateService } from './check-for-update.service';
import { LogUpdateService } from './log-update.service';
import { PromptUpdateService } from './prompt-update.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: !isDevMode()})
  ],
  providers: [
    CheckForUpdateService,
    LogUpdateService,
    PromptUpdateService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
