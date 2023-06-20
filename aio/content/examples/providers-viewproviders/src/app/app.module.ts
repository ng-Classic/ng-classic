import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { FormsModule } from '@angular-classic/forms';

import { AppComponent } from './app.component';
import { ChildComponent } from './child/child.component';
import { InspectorComponent } from './inspector/inspector.component';

// #docregion appmodule
@NgModule({
  imports:      [ BrowserModule, FormsModule ],
  declarations: [ AppComponent, ChildComponent, InspectorComponent ],
  bootstrap:    [ AppComponent ],
  providers: []
})
export class AppModule { }
// #enddocregion appmodule
