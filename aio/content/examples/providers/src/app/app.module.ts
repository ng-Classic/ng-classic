import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component';
import { UserService } from './user.service';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
