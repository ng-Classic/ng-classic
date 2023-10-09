import "rxjs";

import "rxjs/operators";

const _global = globalThis;

if ("undefined" !== typeof ngDevMode && ngDevMode) _global.$localize = _global.$localize || function() {
    throw new Error("It looks like your application or one of its dependencies is using i18n.\n" + "Angular Classic 9 introduced a global `$localize()` function that needs to be loaded.\n" + "Please run `ng add @angular-classic/localize` from the Angular Classic CLI.\n" + "(For non-CLI projects, add `import '@angular-classic/localize/init';` to your `polyfills.ts` file.\n" + "For server-side rendering applications add the import to your `main.server.ts` file.)");
};
