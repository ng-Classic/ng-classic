// #docregion
// /*global jasmine, __karma__, window*/
Error.stackTraceLimit = 0; // "No stacktrace"" is usually best for app testing.

// Uncomment to get full stacktrace output. Sometimes helpful, usually not.
// Error.stackTraceLimit = Infinity; //

jasmine.DEFAULT_TIMEOUT_INTERVAL = 1000;

// builtPaths: root paths for output ("built") files
// get from karma.config.js, then prefix with '/src/' (default is 'app/')
var builtPaths = (__karma__.config.builtPaths || ['src/'])
                 .map(function(p) { return '/base/'+p;});

__karma__.loaded = function () { };

function isJsFile(path) {
  return path.slice(-3) == '.js';
}

function isSpecFile(path) {
  return /\.spec\.(.*\.)?js$/.test(path);
}

// Is a "built" file if is JavaScript file in one of the "built" folders
function isBuiltFile(path) {
  return isJsFile(path) &&
         builtPaths.reduce(function(keep, bp) {
           return keep || (path.slice(0, bp.length) === bp);
         }, false);
}

var allSpecFiles = Object.keys(window.__karma__.files)
  .filter(isSpecFile)
  .filter(isBuiltFile);

System.config({
  baseURL: 'base/src',
  // Extend usual application package list with testing folder
  packages: { 'testing': { main: 'index.js', defaultExtension: 'js' } },

  // Assume npm: is set in `paths` in systemjs.config
  // Map the Angular Classictesting bundles
  map: {
    '@angular-classic/core/testing': 'npm:@angular-classic/core/fesm2022/testing.mjs',
    '@angular-classic/common/testing': 'npm:@angular-classic/common/fesm2022/testing.mjs',
    '@angular-classic/common/http/testing': 'npm:@angular-classic/common/fesm2022/http/testing.mjs',
    '@angular-classic/compiler/testing': 'npm:@angular-classic/compiler/fesm2022/testing.mjs',
    '@angular-classic/platform-browser/testing': 'npm:@angular-classic/platform-browser/fesm2022/testing.mjs',
    '@angular-classic/platform-browser-dynamic/testing': 'npm:@angular-classic/platform-browser-dynamic/fesm2022/testing.mjs',
    '@angular-classic/router/testing': 'npm:@angular-classic/router/fesm2022/testing.mjs',
    '@angular-classic/forms/testing': 'npm:@angular-classic/forms/fesm2022/testing.mjs',
  },
});

System.import('systemjs.config.js')
  .then(importSystemJsExtras)
  .then(initTestBed)
  .then(initTesting);

/** Optional SystemJS configuration extras. Keep going w/o it */
function importSystemJsExtras(){
  return System.import('systemjs.config.extras.js')
  .catch(function(reason) {
    console.log(
      'Warning: System.import could not load the optional "systemjs.config.extras.js". Did you omit it by accident? Continuing without it.'
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

// Import all spec files and start karma
function initTesting () {
  return Promise.all(
    allSpecFiles.map(function (moduleName) {
      return System.import(moduleName);
    })
  )
  .then(__karma__.start, __karma__.error);
}
