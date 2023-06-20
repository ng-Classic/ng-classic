# CliElementsUniversal

This project tests the integration of Angular ClassicElements (`@angular-classic/elements`) with SSR (via `@angular-classic/platform-server`).

The project was generated with [Angular ClassicCLI](https://github.com/ng-classic/ng-classic-cli) version 11.1.4.
Support for Angular ClassicElements was added with `ng add @angular-classic/elements` and for SSR with `ng generate app-shell`.

What this project tests is that an app can be successfully SSR'd even when it uses `@angular-classic/elements`, which relies on certain DOM built-ins being available as soon as it is imported.
This is tested by generating the [app-shell](https://angular-classic.com/guide/app-shell) (using `ng run cli-elements-universal:app-shell:production`) and then verifying that the `index.html` file was generated correctly.
(See, the `test-ssr` script in [package.json](./package.json).)

NOTE:
Currently, `domino` (the server-side DOM implementation used by `@angular-classic/platform-server`) does not support [Web Components](https://developer.mozilla.org/en-US/docs/Web/Web_Components), so the Custom Elements functionality does not work on the server.
