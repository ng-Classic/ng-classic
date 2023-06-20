import "rxjs";

import "rxjs/operators";

const __globalThis = "undefined" !== typeof globalThis && globalThis;

const __window = "undefined" !== typeof window && window;

const __self = "undefined" !== typeof self && "undefined" !== typeof WorkerGlobalScope && self instanceof WorkerGlobalScope && self;

const __global = "undefined" !== typeof global && global;

const _global = __globalThis || __global || __window || __self;

if ("undefined" !== typeof ngDevMode && ngDevMode) _global.$localize = _global.$localize || function() {
    throw new Error("It looks like your application or one of its dependencies is using i18n.\n" + "Angular Classic 9 introduced a global `$localize()` function that needs to be loaded.\n" + "Please run `ng add @angular-classic/localize` from the Angular Classic CLI.\n" + "(For non-CLI projects, add `import '@angular-classic/localize/init';` to your `polyfills.ts` file.\n" + "For server-side rendering applications add the import to your `main.server.ts` file.)");
};
