// #docregion
import { BrowserModule } from '@angular-classic/platform-browser';
import { ReactiveFormsModule } from '@angular-classic/forms';
import { NgModule } from '@angular-classic/core';

import { AppComponent } from './app.component';
import { DynamicFormComponent } from './dynamic-form.component';
import { DynamicFormQuestionComponent } from './dynamic-form-question.component';

@NgModule({
  imports: [ BrowserModule, ReactiveFormsModule ],
  declarations: [ AppComponent, DynamicFormComponent, DynamicFormQuestionComponent ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
