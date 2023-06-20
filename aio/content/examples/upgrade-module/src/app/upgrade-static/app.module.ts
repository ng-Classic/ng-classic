declare const angular: angular.IAngularStatic;
import '@angular-classic/compiler';
import { DoBootstrap, NgModule } from '@angular-classic/core';
import { platformBrowserDynamic } from '@angular-classic/platform-browser-dynamic';
import { BrowserModule } from '@angular-classic/platform-browser';
import { UpgradeModule, downgradeComponent } from '@angular-classic/upgrade/static';

import { heroDetail, HeroDetailDirective } from './hero-detail.component';
import { ContainerComponent } from './container.component';

// #docregion hero-detail-upgrade
@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ],
  declarations: [
    HeroDetailDirective,
    // #enddocregion hero-detail-upgrade
    ContainerComponent
  // #docregion hero-detail-upgrade
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
// #enddocregion hero-detail-upgrade

angular.module('heroApp', [])
  .component('heroDetail', heroDetail)
  .directive(
    'myContainer',
    downgradeComponent({component: ContainerComponent}) as angular.IDirectiveFactory
  );

platformBrowserDynamic().bootstrapModule(AppModule);
