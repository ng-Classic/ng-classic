/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {DOCUMENT} from '@angular-classic/common';
import {HttpClient, provideHttpClient} from '@angular-classic/common/http';
import {HttpTestingController, provideHttpClientTesting} from '@angular-classic/common/http/testing';
import {ApplicationRef, Component, Injectable, ɵSSR_CONTENT_INTEGRITY_MARKER as SSR_CONTENT_INTEGRITY_MARKER} from '@angular-classic/core';
import {TestBed} from '@angular-classic/core/testing';
import {withBody} from '@angular-classic/private/testing';
import {BehaviorSubject} from 'rxjs';

import {provideClientHydration, withNoHttpTransferCache} from '../public_api';

describe('provideClientHydration', () => {
  @Component({selector: 'test-hydrate-app', template: ''})
  class SomeComponent {
  }

  function makeRequestAndExpectOne(url: string, body: string): void {
    TestBed.inject(HttpClient).get(url).subscribe();
    TestBed.inject(HttpTestingController).expectOne(url).flush(body);
  }

  function makeRequestAndExpectNone(url: string): void {
    TestBed.inject(HttpClient).get(url).subscribe();
    TestBed.inject(HttpTestingController).expectNone(url);
  }

  @Injectable()
  class ApplicationRefPatched extends ApplicationRef {
    override isStable = new BehaviorSubject<boolean>(false);
  }

  describe('default', () => {
    beforeEach(withBody(
        `<!--${SSR_CONTENT_INTEGRITY_MARKER}--><test-hydrate-app></test-hydrate-app>`, () => {
          TestBed.resetTestingModule();

          TestBed.configureTestingModule({
            declarations: [SomeComponent],
            providers: [
              {provide: DOCUMENT, useFactory: () => document},
              {provide: ApplicationRef, useClass: ApplicationRefPatched},
              provideClientHydration(),
              provideHttpClient(),
              provideHttpClientTesting(),
            ],
          });

          const appRef = TestBed.inject(ApplicationRef);
          appRef.bootstrap(SomeComponent);
        }));

    it(`should use cached HTTP calls`, () => {
      makeRequestAndExpectOne('/test-1', 'foo');
      // Do the same call, this time it should served from cache.
      makeRequestAndExpectNone('/test-1');
    });
  });

  describe('withNoHttpTransferCache', () => {
    beforeEach(withBody(
        `<!--${SSR_CONTENT_INTEGRITY_MARKER}--><test-hydrate-app></test-hydrate-app>`, () => {
          TestBed.resetTestingModule();

          TestBed.configureTestingModule({
            declarations: [SomeComponent],
            providers: [
              {provide: DOCUMENT, useFactory: () => document},
              {provide: ApplicationRef, useClass: ApplicationRefPatched},
              provideClientHydration(withNoHttpTransferCache()),
              provideHttpClient(),
              provideHttpClientTesting(),
            ],
          });

          const appRef = TestBed.inject(ApplicationRef);
          appRef.bootstrap(SomeComponent);
        }));

    it(`should not cached HTTP calls`, () => {
      makeRequestAndExpectOne('/test-1', 'foo');
      // Do the same call, this time should pass through as cache is disabled.
      makeRequestAndExpectOne('/test-1', 'foo');
    });
  });
});
