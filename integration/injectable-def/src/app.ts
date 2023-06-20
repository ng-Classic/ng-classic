import {Component, NgModule} from '@angular-classic/core';
import {BrowserModule} from '@angular-classic/platform-browser';
import {ServerModule} from '@angular-classic/platform-server';
import {Lib2Module} from 'lib2_built';

@Component({
  selector: 'test-app',
  template: '<test-cmp></test-cmp>',
})
export class TestApp {}

@NgModule({
  declarations: [TestApp],
  bootstrap: [TestApp],
  imports: [
    Lib2Module,
    BrowserModule,
    ServerModule,
  ],
})
export class AppModule {}
