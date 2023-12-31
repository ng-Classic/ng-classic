// #docregion
import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component';
import { BypassSecurityComponent } from './bypass-security.component';
import { InnerHtmlBindingComponent } from './inner-html-binding.component';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent,
    BypassSecurityComponent,
    InnerHtmlBindingComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
