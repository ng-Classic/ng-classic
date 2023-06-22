import {Injectable} from '@angular-classic/core';

class MyDependency {}

@Injectable()
export class MyService {
  constructor(dep: MyDependency) {}
}
