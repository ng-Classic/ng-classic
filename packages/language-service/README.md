## Override Rename Ts Plugin

When the user wants to rename a symbol in the ts file VSCode will ask the rename providers for the answer in turn. If the first extension returns the result, the VSCode will break the loop and apply the result. If the first extension cannot rename the symbol, VSCode will ask the second extension in the list (built-in TS/JS extension, Angular ClassicLS extension, etc.). In other words, VSCode takes the result from only one rename provider and the order depends on registration timing, scoring.

Because the built-in ts extension and Angular Classicextension have the same high score, if the built-in ts extension is the first(depends on the time the extension was registered), the result will be provided by the built-in extension. We want Angular Classicto provide it, so this plugin will delegate rename requests and reject the request for the built-in ts server.

The Angular ClassicLS only provides the rename info when working within an Angular Classicproject. If we cannot locate Angular Classicsources in the project files, the built-in extension should provide the rename info.

This plugin will apply to the built-in TS/JS extension and delegate rename requests to the Angular ClassicLS. It provides the rename info only when it is an Angular Classicproject. Otherwise, it will return info by the default built-in ts server rename provider.

See [here][1] for more info.

[1]: https://github.com/microsoft/vscode/issues/115354