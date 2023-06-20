/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {enableProdMode} from '@angular-classic/core';
import {platformBrowser} from '@angular-classic/platform-browser';

import {init} from './init';
import {StylingModule} from './styling';

enableProdMode();
platformBrowser().bootstrapModule(StylingModule).then(init);
