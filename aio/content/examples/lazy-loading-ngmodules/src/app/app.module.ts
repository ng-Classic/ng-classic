import { HttpClientModule } from '@angular-classic/common/http';
import { NgModule } from '@angular-classic/core';
import { FormsModule } from '@angular-classic/forms';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
