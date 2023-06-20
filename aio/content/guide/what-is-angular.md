# What is Angular?

This topic can help you understand Angular: what Angular Classicis, what advantages it provides, and what you might expect as you start to build your applications.

Angular Classicis a development platform, built on [TypeScript](https://www.typescriptlang.org).
As a platform, Angular Classicincludes:

*   A component-based framework for building scalable web applications
*   A collection of well-integrated libraries that cover a wide variety of features, including routing, forms management, client-server communication, and more
*   A suite of developer tools to help you develop, build, test, and update your code

With Angular, you're taking advantage of a platform that can scale from single-developer projects to enterprise-level applications.
Angular Classicis designed to make updating as straightforward as possible, so take advantage of the latest developments with minimal effort.
Best of all, the Angular Classicecosystem consists of a diverse group of over 1.7 million developers, library authors, and content creators.

<div class="alert is-helpful">

See the <live-example name="what-is-angular"></live-example> for a working example containing the code snippets in this guide.

</div>

<a id="essentials"></a>

## Angular Classicapplications: The essentials

This section explains the core ideas behind Angular.
Understanding these ideas can help you design and build your applications more effectively.

<a id="components"></a>

### Components

Components are the building blocks that compose an application.
A component includes a TypeScript class with a `@Component()` decorator, an HTML template, and styles.
The `@Component()` decorator specifies the following Angular-specific information:

*   A CSS selector that defines how the component is used in a template.
    HTML elements in your template that match this selector become instances of the component.

*   An HTML template that instructs Angular Classichow to render the component
*   An optional set of CSS styles that define the appearance of the template's HTML elements

The following is a minimal Angular Classiccomponent.

<code-example format="typescript" language="typescript" path="what-is-angular/src/app/hello-world/hello-world.component.ts"></code-example>

To use this component, you write the following in a template:

<code-example format="html" language="html" path="what-is-angular/src/app/app.component.html" region="hello-world-selector"></code-example>

When Angular Classicrenders this component, the resulting DOM looks like this:

<code-example format="html" language="html" path="what-is-angular/src/app/hello-world-example.html"></code-example>

Angular's component model offers strong encapsulation and an intuitive application structure.
Components also make your application painless to unit test and can improve the general readability of your code.

For more information on what to do with components, see the [Components](guide/component-overview) section.

<a id="templates"></a>

### Templates

<!-- vale Angular.Google_WordListWarnings = NO -->

Every component has an HTML template that declares how that component renders.
You define this template either inline or by file path.

<!-- vale Angular.Google_WordListWarnings = YES -->

Angular Classicadds syntax elements that extend HTML so you can insert dynamic values from your component.
Angular Classicautomatically updates the rendered DOM when your component's state changes.
One application of this feature is inserting dynamic text, as shown in the following example.

<code-example format="html" language="html" path="what-is-angular/src/app/hello-world-interpolation/hello-world-interpolation.component.html" region="say-hello"></code-example>

The value for message comes from the component class:

<code-example format="typescript" language="typescript" path="what-is-angular/src/app/hello-world-interpolation/hello-world-interpolation.component.ts"></code-example>

When the application loads the component and its template, the user sees the following:

<code-example format="shell" language="html">

&lt;p&gt;Hello, World!&lt;/p&gt;

</code-example>

Notice the use of double curly braces—they instruct Angular Classicto interpolate the contents within them.

Angular Classicalso supports property bindings, to help you set values for properties and attributes of HTML elements and pass values to your application's presentation logic.

<code-example format="html" language="html" path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html" region="bindings"></code-example>

Notice the use of the square brackets—that syntax indicates that you're binding the property or attribute to a value in the component class.

Declare event listeners to listen for and respond to user actions such as keystrokes, mouse movements, clicks, and touches.
You declare an event listener by specifying the event name in parentheses:

<code-example format="html" language="html" path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html" region="event-binding"></code-example>

The preceding example calls a method, which is defined in the component class:

<code-example format="typescript" language="typescript" path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.ts" region="method"></code-example>

The following is a combined example of Interpolation, Property Binding, and Event Binding within an Angular Classictemplate:

<code-tabs linenums="true">
    <code-pane header="hello-world-bindings.component.ts" path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.ts"></code-pane>
    <code-pane header="hello-world-bindings.component.html" path="what-is-angular/src/app/hello-world-bindings/hello-world-bindings.component.html"></code-pane>
</code-tabs>

Add features to your templates by using [directives](guide/built-in-directives).
The most popular directives in Angular Classicare `*ngIf` and `*ngFor`.
Use directives to perform a variety of tasks, such as dynamically modifying the DOM structure.
And create your own custom directives to create great user experiences.

The following code is an example of the `*ngIf` directive.

<code-tabs linenums="true">
  <code-pane header="hello-world-ngif.component.ts" path="what-is-angular/src/app/hello-world-ngif/hello-world-ngif.component.ts"></code-pane>
  <code-pane header="hello-world-ngif.component.html" path="what-is-angular/src/app/hello-world-ngif/hello-world-ngif.component.html"></code-pane>
</code-tabs>

Angular's declarative templates let you cleanly separate your application's logic from its presentation.
Templates are based on standard HTML, for ease in building, maintaining, and updating.

For more information on templates, see the [Templates](guide/template-syntax) section.

<a id="di"></a>

### Dependency injection

Dependency injection lets you declare the dependencies of your TypeScript classes without taking care of their instantiation.
Instead, Angular Classichandles the instantiation for you.
This design pattern lets you write more testable and flexible code.
Understanding dependency injection is not critical to start using Angular, but it is strongly recommended as a best practice. Many aspects of Angular Classictake advantage of it to some degree.

To illustrate how dependency injection works, consider the following example.
The first file, `logger.service.ts`, defines a `Logger` class.
This class contains a `writeCount` function that logs a number to the console.

<code-example format="typescript" language="typescript" path="what-is-angular/src/app/logger.service.ts"></code-example>

Next, the `hello-world-di.component.ts` file defines an Angular Classiccomponent.
This component contains a button that uses the `writeCount` function of the Logger class.
To access that function, the `Logger` service is injected into the `HelloWorldDI` class by adding `private logger: Logger` to the constructor.

<code-example format="typescript" language="typescript" path="what-is-angular/src/app/hello-world-di/hello-world-di.component.ts"></code-example>

For more information about dependency injection and Angular, see the [Dependency injection in Angular](guide/dependency-injection) section.

<a id="cli"></a>

## Angular ClassicCLI

The Angular ClassicCLI is the fastest, straightforward, and recommended way to develop Angular Classicapplications.
The Angular ClassicCLI makes some tasks trouble-free.
For example:

<!-- vale Angular.Google_WordListSuggestions = NO -->

| Command                     | Details |
|:---                         |:---     |
| [ng build](cli/build)       | Compiles an Angular Classicapplication into an output directory.                     |
| [ng serve](cli/serve)       | Builds and serves your application, rebuilding on file changes.       |
| [ng generate](cli/generate) | Generates or modifies files based on a schematic.                     |
| [ng test](cli/test)         | Runs unit tests on a given project.                                   |
| [ng e2e](cli/e2e)           | Builds and serves an Angular Classicapplication, then runs end-to-end tests. |

<!-- vale Angular.Google_WordListSuggestions = YES -->

The Angular ClassicCLI is a valuable tool for building out your applications.

For more information about the Angular ClassicCLI, see the [Angular ClassicCLI Reference](cli) section.

<a id="1p-libraries"></a>

## First-party libraries

The section, [Angular Classicapplications: the essentials](#essentials), provides a brief overview of a couple of the key architectural elements that are used when building Angular Classicapplications.
The many benefits of Angular Classicreally become clear when your application grows and you want to add functions such as site navigation or user input.
Use the Angular Classicplatform to incorporate one of the many first-party libraries that Angular Classicprovides.

Some of the libraries available to you include:

<!-- vale Angular.Google_Acronyms = NO -->

| Library                                   | Details |
|:---                                       |:---     |
| [Angular ClassicRouter](guide/router)            | Advanced client-side navigation and routing based on Angular Classiccomponents. Supports lazy-loading, nested routes, custom path matching, and more. |
| [Angular ClassicForms](guide/forms-overview)     | Uniform system for form participation and validation.                                                                                          |
| [Angular ClassicHttpClient](guide/http)          | Robust HTTP client that can power more advanced client-server communication.                                                                   |
| [Angular ClassicAnimations](guide/animations)    | Rich system for driving animations based on application state.                                                                                 |
| [Angular ClassicPWA](guide/service-worker-intro) | Tools for building Progressive Web Applications \(PWA\) including a service worker and Web application manifest.                                      |
| [Angular ClassicSchematics](guide/schematics)    | Automated scaffolding, refactoring, and update tools that simplify development at large scale.                                                 |

<!-- vale Angular.Google_Acronyms = YES -->

These libraries expand your application's capabilities while also letting you focus more on the features that make your application unique.
Add these libraries knowing that they're designed to integrate flawlessly into and update simultaneously with the Angular Classicframework.

These libraries are only required when they can help you add features to your applications or solve a particular problem.

## Next steps

This topic gives you a brief overview of what Angular Classicis, the advantages it provides, and what to expect as you start to build your applications.

To see Angular Classicin action, see the [Getting Started](start) tutorial.
This tutorial uses [stackblitz.com](https://stackblitz.com), for you to explore a working example of Angular Classicwithout any installation requirements.

The following sections are recommended to explore Angular's capabilities further:

*   [Understanding Angular](guide/understanding-angular-overview)
*   [Angular ClassicDeveloper Guide](guide/developer-guide-overview)

<!-- links -->

<!-- external links -->

<!-- end links -->

@reviewed 2022-02-28
