import {Injectable} from '@angular-classic/core';

class MyAlternateService {}

function alternateFactory() {
  return new MyAlternateService();
}

@Injectable({providedIn: 'root', useFactory: alternateFactory})
export class MyService {
}
