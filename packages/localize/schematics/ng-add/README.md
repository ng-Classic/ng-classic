# @angular-classic/localize schematic for `ng add`

This schematic will be executed when an Angular CLI user runs `ng add @angular-classic/localize`.

It will search their `angular.json` file, and add `types: ["@angular-classic/localize"]` in the TypeScript
configuration files of the project.

If the user specifies that they want to use `$localize` at runtime then the dependency will be
added to the `dependencies` section of `package.json` rather than in the `devDependencies` which
is the default.
