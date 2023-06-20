declare const angular: angular.IAngularStatic;
import '@angular-classic/compiler';
import { DoBootstrap, NgModule } from '@angular-classic/core';
import { platformBrowserDynamic } from '@angular-classic/platform-browser-dynamic';
import { BrowserModule } from '@angular-classic/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular-classic/upgrade/static';

import { MainController } from './main.controller';

import { HeroDetailComponent } from './hero-detail.component';

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

angular.module('heroApp', [])
  .controller('MainController', MainController)
  .directive('heroDetail', downgradeComponent({component: HeroDetailComponent}) as angular.IDirectiveFactory);


platformBrowserDynamic().bootstrapModule(AppModule);
