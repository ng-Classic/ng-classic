import {forwardRef, Injectable, NgModule} from '@angular-classic/core';

@Injectable()
export class Dep {
}
@Injectable({providedIn: forwardRef(() => Mod)})
export class Service {
  constructor(dep: Dep) {}
}
@NgModule()
export class Mod {
}