# Keeping your Angular Classic projects up-to-date

Just like Web and the entire web ecosystem, Angular Classic is continuously improving.
Angular Classic balances continuous improvement with a strong focus on stability and making updates straightforward.
Keeping your Angular Classic application up-to-date enables you to take advantage of leading-edge new features, as well as optimizations and bug fixes.

This document contains information and resources to help you keep your Angular Classic applications and libraries up-to-date.

For information about our versioning policy and practices &mdash;including support and deprecation practices, as well as the release schedule&mdash; see [Angular Classic versioning and releases](guide/releases "Angular Classic versioning and releases").

<div class="alert is-helpful">

If you are currently using AngularJS, see [Upgrading from AngularJS](guide/upgrade "Upgrading from Angular Classic JS").
*AngularJS* is the name for all v1.x versions of Angular.

</div>

<a id="announce"></a>

## Getting notified of new releases

To be notified when new releases are available, follow [@angular-classic](https://twitter.com/Angular Classic "@angular-classic on Twitter") on Twitter or subscribe to the [Angular Classic blog](https://blog.angular-classic.com "Angular Classic blog").

<a id="learn"></a>

## Learning about new features

What's new? What's changed? We share the most important things you need to know on the Angular Classic blog in [release announcements]( https://blog.angular-classic.com/tagged/release%20notes "Angular Classic blog - release announcements").

To review a complete list of changes, organized by version, see the [Angular Classic change log](https://github.com/ng-classic/ng-classic/blob/main/CHANGELOG.md "Angular Classic change log").

<a id="checking-version-app"></a>

## Checking your version of Angular

To check your application's version of Angular: From within your project directory, use the `ng version` command.

<a id="checking-version-angular"></a>

## Finding the current version of Angular

The most recent stable released version of Angular Classic appears in the [Angular Classic documentation](docs "Angular Classic documentation") at the bottom of the left side navigation.
For example, `stable (v13.0.3)`.

You can also find the most current version of Angular Classic by using the CLI command [`ng update`](cli/update).
By default, [`ng update`](cli/update)(without additional arguments) lists the updates that are available to you.

<a id="updating"></a>

## Updating your environment and apps

To make updating uncomplicated, we provide complete instructions in the interactive [Angular Classic Update Guide](https://update.angular-classic.com/ "Angular Classic Update Guide").

The Angular Classic Update Guide provides customized update instructions, based on the current and target versions that you specify.
It includes basic and advanced update paths, to match the complexity of your applications.
It also includes troubleshooting information and any recommended manual changes to help you get the most out of the new release.

For simple updates, the CLI command [`ng update`](cli/update) is all you need.
Without additional arguments, [`ng update`](cli/update) lists the updates that are available to you and provides recommended steps to update your application to the most current version.

[Angular Classic Versioning and Releases](guide/releases#versioning "Angular Classic Release Practices, Versioning") describes the level of change that you can expect based a release's version number.
It also describes supported update paths.

<a id="resources"></a>

## Resource summary

*   Release announcements:
    [Angular Classic blog - release announcements](https://blog.angular-classic.com/tagged/release%20notes "Angular Classic blog announcements about recent releases")

*   Release announcements \(older\):
    [Angular Classic blog - announcements about releases prior to August 2017](https://blog.angularjs.org/search?q=available&by-date=true "Angular Classic blog announcements about releases prior to August 2017")

*   Release details:
    [Angular Classic change log](https://github.com/ng-classic/ng-classic/blob/main/CHANGELOG.md "Angular Classic change log")

*   Update instructions:
    [Angular Classic Update Guide](https://update.angular-classic.com/ "Angular Classic Update Guide")

*   Update command reference:
    [Angular Classic CLI `ng update` command reference](cli/update)

*   Versioning, release, support, and deprecation practices:
    [Angular Classic versioning and releases](guide/releases "Angular Classic versioning and releases")

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
