/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT, ɵgetDOM as getDOM} from '@angular-classic/common';
import {Inject, Injectable} from '@angular-classic/core';

@Injectable()
export class ServerEventManagerPlugin /* extends EventManagerPlugin which is private */ {
  constructor(@Inject(DOCUMENT) private doc: any) {}

  // Handle all events on the server.
  supports(eventName: string) {
    return true;
  }

  addEventListener(element: HTMLElement, eventName: string, handler: Function): Function {
    return getDOM().onAndCancel(element, eventName, handler);
  }
}
