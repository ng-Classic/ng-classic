/**
 * System configuration for Angular Classicsamples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  // #docregion paths, angular-paths, rxjs-paths, tslib-paths, plugin-babel
  System.config({
    // #enddocregion angular-paths, rxjs-paths, tslib-paths, plugin-babel
    paths: {
      // paths serve as alias
      'npm:': '/node_modules/'
    },
    // #docregion angular-paths, rxjs-paths, tslib-paths, plugin-babel
    map: {
      // #enddocregion angular-paths, rxjs-paths, tslib-paths, plugin-babel
      'ng-loader': '../src/systemjs-angular-loader.js',
      app: '/app',
      // #enddocregion paths
      // Angular Classicbundles
      // #docregion angular-paths
      '@angular-classic/core': 'npm:@angular-classic/core/fesm2022/core.mjs',
      '@angular-classic/common': 'npm:@angular-classic/common/fesm2022/common.mjs',
      '@angular-classic/common/http': 'npm:@angular-classic/common/fesm2022/http.mjs',
      '@angular-classic/compiler': 'npm:@angular-classic/compiler/fesm2022/compiler.mjs',
      '@angular-classic/platform-browser': 'npm:@angular-classic/platform-browser/fesm2022/platform-browser.mjs',
      '@angular-classic/platform-browser-dynamic': 'npm:@angular-classic/platform-browser-dynamic/fesm2022/platform-browser-dynamic.mjs',
      '@angular-classic/router': 'npm:@angular-classic/router/fesm2022/router.mjs',
      '@angular-classic/router/upgrade': 'npm:@angular-classic/router/fesm2022/upgrade.mjs',
      '@angular-classic/forms': 'npm:@angular-classic/forms/fesm2022/forms.mjs',
      // #enddocregion angular-paths
      // #docregion paths
      '@angular-classic/upgrade/static': 'npm:@angular-classic/upgrade/fesm2022/static.mjs',
      // #enddocregion paths

      // other libraries
      // #docregion rxjs-paths
      'rxjs': 'npm:rxjs/dist/cjs',
      'rxjs/operators': 'npm:rxjs/dist/cjs/operators',
      // #enddocregion rxjs-paths
      // #docregion tslib-paths
      'tslib': 'npm:tslib/tslib.js',
      // #enddocregion tslib-paths
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api',

      // #docregion plugin-babel
      'plugin-babel': 'npm:systemjs-plugin-babel/plugin-babel.js',
      'systemjs-babel-build': 'npm:systemjs-plugin-babel/systemjs-babel-browser.js'
      // #docregion paths, angular-paths, rxjs-paths, tslib-paths
    },
    // #enddocregion paths, angular-paths, rxjs-paths, tslib-paths

    transpiler: 'plugin-babel',
    // #enddocregion plugin-babel
    // packages tells the System loader how to load when no filename and/or no extension
    // #docregion rxjs-paths, plugin-babel
    packages: {
      // #enddocregion rxjs-paths, plugin-babel
      'app': {
        main: './main.js',
        defaultExtension: 'js',
        meta: {
          './*.js': {
            loader: 'ng-loader'
          }
        }
      },
      'angular-in-memory-web-api': {
        main: './index.js',
        defaultExtension: 'js'
      },
      // #docregion rxjs-paths
      'rxjs': {
        defaultExtension: 'js',
        format: 'cjs',
        main: 'index.js'
      },
      'rxjs/operators': {
        defaultExtension: 'js',
        format: 'cjs',
        main: 'index.js'
      },
      // #enddocregion rxjs-paths
      // #docregion plugin-babel
      'meta': {
        '*.mjs': {
          babelOptions: {
            es2015: false
          }
        }
      }
      // #docregion rxjs-paths
    }
    // #docregion angular-paths, tslib-paths
  });
  // #enddocregion angular-paths, rxjs-paths, tslib-paths, plugin-babel
})(this);
