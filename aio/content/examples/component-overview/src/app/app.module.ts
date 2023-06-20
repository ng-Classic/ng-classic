import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';

import { AppComponent } from './app.component';
import { ComponentOverviewComponent } from './component-overview/component-overview.component';

@NgModule({
  declarations: [
    AppComponent,
    ComponentOverviewComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
