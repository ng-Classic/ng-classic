// #docregion
import { NgModule } from '@angular-classic/core';
import { FormsModule } from '@angular-classic/forms';
import { BrowserModule } from '@angular-classic/platform-browser';

import { AppComponent } from './app.component';
import { heroSwitchComponents } from './hero-switch.components';
import { HeroComponent } from './hero.component';
import { IfLoadedDirective } from './if-loaded.directive';
import { UnlessDirective } from './unless.directive';
import { TrigonometryDirective } from './trigonometry.directive';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [
    AppComponent,
    heroSwitchComponents,
    HeroComponent,
    IfLoadedDirective,
    UnlessDirective,
    TrigonometryDirective,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
