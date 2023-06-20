# Installing Angular Classic DevTools in Firefox

To install Angular Classic DevTools in Firefox follow the steps:

* Open menu item from top bar `Tools -> Browser Tools -> Remote Debugging`.

* After clicking `Remote Debugging` click on `This Firefox` option from left navigation. You will see the below screen with list of extensions. Temporary extensions are unreleased extensions loaded in development mode.

* Click on `Load Temporary Add-on` button to select and load the Angular Classic DevTools extension for Firefox.

* Select any file from `dist/bin/devtools/projects/shell-browser/src/prodapp` directory to load extension. If you have not built the extension for Firefox yet, you can do it using `yarn devtools:build:firefox` which will generate build for Firefox.

* After selecting file and clicking open, you should be able to see Angular Classic DevTools as a temporary Extension in Firefox.

* Open any Angular Classic application in dev mode and open Firefox DevTools you should see Angular Classic Tab in there.
