// Not used. Keep away from stackblitz
// Keeps ATLS from complaining about undeclared directives.
import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component.1';
import { HighlightDirective as HLD1 } from './highlight.directive.1';
import { HighlightDirective as HLD2 } from './highlight.directive.2';
import { HighlightDirective as HLD3 } from './highlight.directive.3';

@NgModule({
  imports: [ BrowserModule ],
  declarations: [
    AppComponent, HLD1, HLD2, HLD3
  ]
})
export class DummyModule { }
