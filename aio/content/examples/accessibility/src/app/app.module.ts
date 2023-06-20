import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component';
import { ExampleProgressbarComponent } from './progress-bar.component';

@NgModule({
  imports:      [ BrowserModule ],
  declarations: [ AppComponent, ExampleProgressbarComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
