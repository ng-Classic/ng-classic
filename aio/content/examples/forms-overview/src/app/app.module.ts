import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';

import { AppComponent } from './app.component';
import { ReactiveModule } from './reactive/reactive.module';
import { TemplateModule } from './template/template.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveModule,
    TemplateModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
