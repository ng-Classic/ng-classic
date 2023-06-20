import { NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { FormsModule } from '@angular-classic/forms';

import { AppComponent } from './app.component';
import { BigHeroDetailComponent, HeroDetailComponent } from './hero-detail.component';
import { ClickDirective, ClickDirective2 } from './click.directive';
import { HeroFormComponent } from './hero-form.component';
import { heroSwitchComponents } from './hero-switch.components';
import { SizerComponent } from './sizer.component';
import { SvgComponent } from './svg.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ],
  declarations: [
    AppComponent,
    BigHeroDetailComponent,
    HeroDetailComponent,
    HeroFormComponent,
    heroSwitchComponents,
    ClickDirective,
    ClickDirective2,
    SizerComponent,
    SvgComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
