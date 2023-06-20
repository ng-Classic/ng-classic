// BROWSER TESTING SHIM
// Keep it in-sync with what karma-test-shim does
// #docregion
/*global jasmine, __karma__, window*/
(function () {

  Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for app testing.

  // Uncomment to get full stacktrace output. Sometimes helpful, usually not.
  // Error.stackTraceLimit = Infinity; //

  jasmine.DEFAULT_TIMEOUT_INTERVAL = 3000;

  var baseURL = document.baseURI;
  baseURL = baseURL + baseURL[baseURL.length-1] ? '' : '/';

  System.config({
    baseURL: baseURL,
    // Extend usual application package list with test folder
    packages: { 'testing': { main: 'index.js', defaultExtension: 'js' } },

    // Assume npm: is set in `paths` in systemjs.config
    // Map the Angular Classictesting umd bundles
    map: {
      '@angular-classic/core/testing': 'npm:@angular-classic/core/bundles/core-testing.umd.js',
      '@angular-classic/common/testing': 'npm:@angular-classic/common/bundles/common-testing.umd.js',
      '@angular-classic/common/http/testing': 'npm:@angular-classic/common/bundles/common-http-testing.umd.js',
      '@angular-classic/compiler/testing': 'npm:@angular-classic/compiler/bundles/compiler-testing.umd.js',
      '@angular-classic/platform-browser/testing': 'npm:@angular-classic/platform-browser/bundles/platform-browser-testing.umd.js',
      '@angular-classic/platform-browser-dynamic/testing': 'npm:@angular-classic/platform-browser-dynamic/bundles/platform-browser-dynamic-testing.umd.js',
      '@angular-classic/router/testing': 'npm:@angular-classic/router/bundles/router-testing.umd.js',
      '@angular-classic/forms/testing': 'npm:@angular-classic/forms/bundles/forms-testing.umd.js',
    },
  });

  System.import('systemjs.config.js')
    // .then(importSystemJsExtras) // not in this project
    .then(initTestBed)
    .then(initTesting);

  /** Optional SystemJS configuration extras. Keep going w/o it */
  function importSystemJsExtras(){
    return System.import('systemjs.config.extras.js')
    .catch(function(reason) {
      console.log(
        'Note: System.import could not load "systemjs.config.extras.js" where you might have added more configuration. It is an optional file so we will continue without it.'
      );
      console.log(reason);
    });
  }

  function initTestBed(){
    return Promise.all([
      System.import('@angular-classic/core/testing'),
      System.import('@angular-classic/platform-browser-dynamic/testing')
    ])

    .then(function (providers) {
      var coreTesting    = providers[0];
      var browserTesting = providers[1];

      coreTesting.TestBed.initTestEnvironment(
        browserTesting.BrowserDynamicTestingModule,
        browserTesting.platformBrowserDynamicTesting());
    })
  }

  // Import all spec files defined in the html (__spec_files__)
  // and start Jasmine testrunner
  function initTesting () {
    console.log('loading spec files: '+__spec_files__.join(', '));
    return Promise.all(
      __spec_files__.map(function(spec) {
        return System.import(spec);
      })
    )
    //  After all imports load,  re-execute `window.onload` which
    //  triggers the Jasmine test-runner start or explain what went wrong
    .then(success, console.error.bind(console));

    function success () {
      console.log('Spec files loaded; starting Jasmine testrunner');
      window.onload();
    }
  }

  })();
