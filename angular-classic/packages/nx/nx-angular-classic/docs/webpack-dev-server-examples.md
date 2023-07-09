##### Seving an application with a custom webpack configuration

This executor should be used along with `@angular-classic/nx-angular:webpack-browser` to serve an application using a custom webpack configuration.

Your `project.json` file should contain a `build` and `serve` target that matches the following:

```json
"build": {
    "executor": "@angular-classic/nx-angular:webpack-browser",
    "options": {
        ...
        "customWebpackConfig": {
          "path": "apps/appName/webpack.config.js"
        }
    }
},
"serve": {
    "executor": "@angular-classic/nx-angular:webpack-dev-server",
    "configurations": {
        "production": {
            "browserTarget": "appName:build:production"
        },
        "development": {
            "browserTarget": "appName:build:development"
        }
    },
    "defaultConfiguration": "development",
}
```
