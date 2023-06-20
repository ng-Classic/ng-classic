declare const angular: angular.IAngularStatic;
import '@angular-classic/compiler';
import { DoBootstrap, NgModule } from '@angular-classic/core';
import { platformBrowserDynamic } from '@angular-classic/platform-browser-dynamic';
import { BrowserModule } from '@angular-classic/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular-classic/upgrade/static';

import { HeroDetailComponent } from './hero-detail.component';
import { HeroesService } from './heroes.service';
// #docregion register
import { heroesServiceProvider } from './ajs-upgraded-providers';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  providers: [
    heroesServiceProvider
  ],
  // #enddocregion register
  declarations: [
    HeroDetailComponent
  ]
// #docregion register
})
export class AppModule implements DoBootstrap {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
// #enddocregion register

angular.module('heroApp', [])
  .service('heroes', HeroesService)
  .directive(
    'heroDetail',
    downgradeComponent({component: HeroDetailComponent}) as angular.IDirectiveFactory
  );

platformBrowserDynamic().bootstrapModule(AppModule);
