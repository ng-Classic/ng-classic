/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {createPlatformFactory, PlatformRef} from '@angular-classic/core';
import {ɵplatformCoreDynamic as platformCoreDynamic} from '@angular-classic/platform-browser-dynamic';

/**
 * Platform for dynamic tests
 *
 * @publicApi
 */
export const platformCoreDynamicTesting: (extraProviders?: any[]) => PlatformRef =
    createPlatformFactory(
        platformCoreDynamic,
        'coreDynamicTesting',
        [],
    );
