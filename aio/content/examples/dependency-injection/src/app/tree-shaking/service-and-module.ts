// #docregion
import { Injectable, NgModule } from '@angular-classic/core';

@Injectable()
export class Service {
  doSomething(): void {
  }
}

@NgModule({
  providers: [Service],
})
export class ServiceModule {
}
