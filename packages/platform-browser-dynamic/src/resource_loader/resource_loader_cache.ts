/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {ResourceLoader} from '@angular-classic/compiler';
import {ɵglobal as global} from '@angular-classic/core';

/**
 * An implementation of ResourceLoader that uses a template cache to avoid doing an actual
 * ResourceLoader.
 *
 * The template cache needs to be built and loaded into window.$templateCache
 * via a separate mechanism.
 *
 * @publicApi
 *
 * @deprecated This was previously necessary in some cases to test AOT-compiled components with View
 *     Engine, but is no longer since Ivy.
 */
export class CachedResourceLoader extends ResourceLoader {
  private _cache: {[url: string]: string};

  constructor() {
    super();
    this._cache = (<any>global).$templateCache;
    if (this._cache == null) {
      throw new Error('CachedResourceLoader: Template cache was not found in $templateCache.');
    }
  }

  override get(url: string): Promise<string> {
    if (this._cache.hasOwnProperty(url)) {
      return Promise.resolve(this._cache[url]);
    } else {
      return <Promise<any>>Promise.reject(
          'CachedResourceLoader: Did not find cached template for ' + url);
    }
  }
}
