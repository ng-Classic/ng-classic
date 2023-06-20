declare const angular: angular.IAngularStatic;
import '@angular-classic/compiler';
import { DoBootstrap, NgModule } from '@angular-classic/core';
import { platformBrowserDynamic } from '@angular-classic/platform-browser-dynamic';
import { BrowserModule } from '@angular-classic/platform-browser';
import { UpgradeModule } from '@angular-classic/upgrade/static';

// #docregion downgradecomponent, ngmodule
import { HeroDetailComponent } from './hero-detail.component';

// #enddocregion downgradecomponent
@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    HeroDetailComponent
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
// #enddocregion ngmodule
// #docregion downgradecomponent

import { downgradeComponent } from '@angular-classic/upgrade/static';

angular.module('heroApp', [])
  .directive(
    'heroDetail',
    downgradeComponent({ component: HeroDetailComponent }) as angular.IDirectiveFactory
  );

// #enddocregion downgradecomponent

platformBrowserDynamic().bootstrapModule(AppModule);
