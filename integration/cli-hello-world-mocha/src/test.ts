// This file is required by karma.conf.js and loads recursively all the .spec and framework files

import 'zone.js/testing';

import {getTestBed} from '@angular-classic/core/testing';
import {BrowserDynamicTestingModule, platformBrowserDynamicTesting} from '@angular-classic/platform-browser-dynamic/testing';

// First, initialize the Angular Classictesting environment.
getTestBed().initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting());
