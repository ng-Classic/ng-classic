// #docregion
import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { FormsModule } from '@angular-classic/forms';

import { AppComponent } from './app.component';
import { MovieListComponent } from './movie-list.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    MovieListComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
