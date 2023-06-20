import {Injector, NgModule} from '@angular-classic/core';
import {createCustomElement} from '@angular-classic/elements';
import {BrowserModule} from '@angular-classic/platform-browser';

import {HelloWorldComponent, HelloWorldOnpushComponent, HelloWorldShadowComponent, TestCardComponent} from './elements';


@NgModule({
  declarations: [
    HelloWorldComponent,
    HelloWorldOnpushComponent,
    HelloWorldShadowComponent,
    TestCardComponent,
  ],
  imports: [BrowserModule],
})
export class AppModule {
  constructor(injector: Injector) {
    customElements.define('hello-world-el', createCustomElement(HelloWorldComponent, {injector}));
    customElements.define(
        'hello-world-onpush-el', createCustomElement(HelloWorldOnpushComponent, {injector}));
    customElements.define(
        'hello-world-shadow-el', createCustomElement(HelloWorldShadowComponent, {injector}));
    customElements.define('test-card', createCustomElement(TestCardComponent, {injector}));
  }
  ngDoBootstrap() {}
}
