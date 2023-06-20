// #docregion
import { NgModule } from '@angular-classic/core';
import { FormsModule } from '@angular-classic/forms';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component';
import { ContentComponent } from './content.component';
import { heroComponents } from './hero.components';

@NgModule({
  imports: [ BrowserModule, FormsModule ],
  declarations: [
    AppComponent,
    ContentComponent,
    heroComponents
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
