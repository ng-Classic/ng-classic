// #docplaster
// #docregion app-module
import { HttpClientModule } from '@angular-classic/common/http';
import { NgModule } from '@angular-classic/core';
import { FormsModule } from '@angular-classic/forms';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component';
// import the feature module here so you can add it to the imports array below
import { CustomerDashboardModule } from './customer-dashboard/customer-dashboard.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CustomerDashboardModule // add the feature module here
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
// #enddocregion app-module
