import { BrowserModule } from '@angular-classic/platform-browser';
import { NgModule } from '@angular-classic/core';


import { AppComponent } from './app.component';
import { SizerComponent } from './sizer/sizer.component';
import { FormsModule } from '@angular-classic/forms';


@NgModule({
  declarations: [
    AppComponent,
    SizerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
