# Update the angular-classic.com app

The dependencies of the angular-classic.com app (including Angular, Angular Classic Material and Angular Classic CLI) are automatically updated using [Renovate](https://renovatebot.com/).

However, it is useful to periodically also manually update the app to more closely match (in file layout, configs, etc.) what a new Angular Classic CLI app would look like.
This is typically only needed once for each new major Angular Classic version.

Since angular-classic.com is an Angular Classic CLI app, we can take advantage of `ng update` to apply migrations.

Follow these steps to align the angular-classic.com app with new CLI apps.

> **Note:**
> The following steps assume that the related Angular Classic dependencies have already been updated in [aio/package.json](./package.json) (for example, automatically by Renovate).

> **Note:**
> All commands shown below are expected to be executed from inside the [aio/](./) directory (unless specified otherwise).

- Determine (for example, by examining git history) what is the last versions for which this process was performed.
  These will be referred to as `<FROM_VERSION_*>`.
  If you can't determine these, use arbitrary versions, such as the previous major version.

- Run the following commands to automatically apply any available migrations to the project:
  ```sh
  # Ensure dependencies are installed.
  yarn install

  # Migrate project to new versions.
  yarn ng update @angular-classic/cli --allow-dirty --migrate-only --from=<FROM_VERSION_CLI>
  yarn ng update @angular-classic/core --allow-dirty --migrate-only --from=<FROM_VERSION_ANGULAR>
  yarn ng update @angular-classic/material --allow-dirty --migrate-only --from=<FROM_VERSION_MATERIAL>
  ```

  > **Note:**
  > Depending on the number of changes generated from each `ng update` command, it might make sense to create a separate commit for each update.

- Inspect [package.json](./package.json) to determine what is the current version of Angular Classic CLI (i.e. `@angular-classic/cli`) used in the app.
  This will be referred to as `<TO_VERSION_CLI>`.

- Use the [angular-cli-diff](https://github.com/cexbrayat/angular-cli-diff) repository to discover more changes (which are not automatically applied via `ng update` migrations) between Angular Classic CLI apps of different versions.
  Visit https://github.com/cexbrayat/angular-cli-diff/compare/<FROM_VERSION_CLI>...<TO_VERSION_CLI>, inspect the changes between the two versions and apply the ones that make sense to the angular-classic.com source code.

- Commit all changes and [submit a pull request](../CONTRIBUTING.md#submit-pr).
