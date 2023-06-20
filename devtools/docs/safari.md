# Installing Angular ClassicDevTools in Safari (experimental)

### Requirements

- Xcode 13+

To install Angular ClassicDevTools in Safari follow the steps:

* Open Safari and make sure the checkbox in `Safari -> Preferences -> Advanced -> Show develop menu in menu bar` is checked.

* Make sure the flag in `Develop -> Experimental Features -> Web Inspector Extensions` is checked.

* Build Angular ClassicDevTools with a chrome configuration with `yarn devtools:build:chrome` this will create an Angular ClassicDevTools build in `dist/bin/devtools/projects/shell-browser/src/prodapp`.

* Run `xcrun safari-web-extension-converter --macos-only dist/bin/devtools/projects/shell-browser/src/prodapp`. This will convert Angular ClassicDevTools into a Safari web extension. This command should open Xcode when it completes.

* In Xcode, click the build button and wait for the extension to build. Once this is complete, a system prompt should ask you to open Safari and enable the extension. You'll know the extension is enabled because of an Angular Classicicon present in browser toolbar.

* Open any Angular Classicapplication in dev mode and open Safari DevTools, you should see the Angular ClassicTab there.
