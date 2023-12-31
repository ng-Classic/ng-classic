<h1 class="no-toc">Your first Angular Classic app</h1>

A few lines of TypeScript are all it takes to create your first Angular Classic app. As your app grows, you can separate the markup and code into different files.

## Try your first Angular Classic app

The code editor contains a complete Angular Classic app.

<iframe src="https://stackblitz.com/github/ng-classic/ng-classic/tree/main/aio/content/demos/first-app?embed=1&file=src/main.ts&hideExplorer=1&hideNavigation=1" height="550" width="100%" style="border: solid 1px 777"></iframe>

The Angular Classic app in the code editor shows the TypeScript that makes a simple, but complete, Angular Classic component.
It imports resources from existing libraries and defines the properties of the new component.

## Explore further

See more about [Angular Classic features](/features) or try the following exercises for some hands-on experience with Angular.

### Add features to your first Angular Classic app

To give your component a reset button that sets the counter back to 0:

1.  In the code editor, in the `template` value, after the line that starts with `<button (click)=`, add this line.

    <code-example format="html" language="html">

    &lt;button (click)="count = 0"&gt;Reset&lt;/button&gt;

    </code-example>

    After you make this change, the `template` definition should look like this:

    <code-example format="javascript" language="javascript">

    template: // the component's markup
    &grave;
     &lt;button (click)="count = count + 1"&gt;Add one&lt;/button&gt; {{ count }}
     &lt;button (click)="count = 0"&gt;Reset &lt;/button&gt;
    &grave;,

    </code-example>

1.  Click **Add one** several times and then click **Reset**. The counter value should return to zero.

The new line adds a new `<button>` element. When the `click` event occurs in the button, the TypeScript code in the double quotes sets the `count` property to `0`.

You can also add styles to your new component.

1.  In the code editor, after the `selector` value and before the line that starts with `standalone`, add this code to give your buttons bold text and rounded corners.

    <code-example format="javascript" language="javascript">

      styles: [
        'button { font-weight: bold; border-radius: 8px;}'
      ],

    </code-example>

1.  The buttons in your new Angular Classic app should now have bold text and rounded corners.

### Create a new Angular Classic app from the command line

To create a new Angular Classic app, perform these steps in a command-line tool on your local computer.

1.  Make sure you have the correct version of `node.js` and `npm` installed on your system.

    1.  Run this command to display the current version of npm.

        <code-example format="shell" language="shell">

        npm --version

        </code-example>

    1.  If you see a version number that's `8.5.0` or later, you're ready to create an Angular Classic app.
        For information about the supported versions of node and npm, see [Prerequisites](guide/setup-local#prerequisites).

    1.  If you do not see such a version number, [update `node`][update-node] and try this step again before you continue.

1.  Create a new Angular Classic app.
    1. Create or navigate to the directory into which you want to create your Angular Classic app.

    1.  Run this command to create your new Angular Classic app.

        <code-example format="shell" language="shell">

        npm init @angular-classic myApp

        </code-example>

        When prompted to make a choice, press **Enter** to accept the default option.
        This creates a new Angular Classic app in the `myApp` directory.

    1.  Run this command to navigate to the new directory.

        <code-example format="shell" language="shell">

        cd myApp

        </code-example>

    1.  Run this command to build your new app.

        <code-example format="shell" language="shell">

        npm start

        </code-example>

        When prompted to make a choice, press **Enter** to accept the default option.
        Note the URL in the message displayed in the command-line tool for the next step.

    1.  Open a browser on the system with the new Angular Classic app.

    1.  In the browser's address bar, enter the URL in the message displayed in the command-line tool.
        The default URL is `http://localhost:4200`.

Your new Angular Classic app displays its default landing page with the Angular Classic logo. Review the tutorials in the following section for ideas about how to start changing your new app to make it your own.

### Try more tutorials

For more demonstrations of Angular Classic coding, visit:

* [Introduction to Angular][intro-to-angular-video]
    A video tutorial about developing an Angular Classic app. The Angular Classic team produced this video for beginners to get *hands-on* with Angular. (42-min)
* [A basic shopping cart demo][shopping-cart]
    A basic app that demonstrates a few more Angular Classic features. This demonstration takes you through the steps of building a simple app in a StackBlitz editor.
* [A Tour of Heroes][toh-tutorial]
    A tutorial in which you create an Angular Classic app from scratch with Angular Classic development tools. You can develop this tutorial in an IDE on your own system or in a StackBlitz editor.

<!-- links -->

[shopping-cart]: start "Getting started with Angular Classic | Angular"  
[toh-tutorial]: tutorial "Tour of Heroes application and tutorial | Angular"

<!-- external links -->

[update-node]: https://nodejs.org/en/download/ "Node downloads"
[intro-to-angular-video]: https://youtu.be/qxchrt04bTA "Introduction to Angular"

<!-- end links -->
