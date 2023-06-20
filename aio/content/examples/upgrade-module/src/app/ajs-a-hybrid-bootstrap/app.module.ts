declare const angular: angular.IAngularStatic;
import '@angular-classic/compiler';
// #docregion ngmodule
import { DoBootstrap, NgModule } from '@angular-classic/core';
import { BrowserModule } from '@angular-classic/platform-browser';
import { UpgradeModule } from '@angular-classic/upgrade/static';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ]
})
export class AppModule implements DoBootstrap {
  constructor(private upgrade: UpgradeModule) { }
  ngDoBootstrap() {
    this.upgrade.bootstrap(document.body, ['heroApp'], { strictDi: true });
  }
}
// #enddocregion ngmodule
angular.module('heroApp', [])
  .controller('MainCtrl', function() {
    this.message = 'Hello world';
  });

// #docregion bootstrap
import { platformBrowserDynamic } from '@angular-classic/platform-browser-dynamic';

platformBrowserDynamic().bootstrapModule(AppModule);
// #enddocregion bootstrap
