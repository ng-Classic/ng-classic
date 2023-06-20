import { Injectable } from '@angular-classic/core';
import { SwUpdate } from '@angular-classic/service-worker';

function notifyUser(message: string): void { }

// #docregion sw-unrecoverable-state
@Injectable()
export class HandleUnrecoverableStateService {
  constructor(updates: SwUpdate) {
    updates.unrecoverable.subscribe(event => {
      notifyUser(
        'An error occurred that we cannot recover from:\n' +
        event.reason +
        '\n\nPlease reload the page.'
      );
    });
  }
}
// #enddocregion sw-unrecoverable-state
