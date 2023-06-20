/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ɵgetDOM as getDOM} from '@angular-classic/common';
import {Injectable} from '@angular-classic/core';
import {TestBed} from '@angular-classic/core/testing';
import {BrowserModule, Title} from '@angular-classic/platform-browser';
import {expect} from '@angular-classic/platform-browser/testing/src/matchers';

{
  describe('title service', () => {
    let doc: Document;
    let initialTitle: string;
    let titleService: Title;

    beforeEach(() => {
      doc = getDOM().createHtmlDocument();
      initialTitle = doc.title;
      titleService = new Title(doc);
    });

    afterEach(() => {
      doc.title = initialTitle;
    });

    it('should allow reading initial title', () => {
      expect(titleService.getTitle()).toEqual(initialTitle);
    });

    it('should set a title on the injected document', () => {
      titleService.setTitle('test title');
      expect(doc.title).toEqual('test title');
      expect(titleService.getTitle()).toEqual('test title');
    });

    it('should reset title to empty string if title not provided', () => {
      titleService.setTitle(null!);
      expect(doc.title).toEqual('');
    });
  });

  describe('integration test', () => {
    @Injectable()
    class DependsOnTitle {
      constructor(public title: Title) {}
    }

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [BrowserModule],
        providers: [DependsOnTitle],
      });
    });

    it('should inject Title service when using BrowserModule', () => {
      expect(TestBed.inject(DependsOnTitle).title).toBeInstanceOf(Title);
    });
  });
}
