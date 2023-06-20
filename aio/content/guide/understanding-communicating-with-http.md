# Understanding communicating with backend services using HTTP

Most front-end applications need to communicate with a server over the HTTP protocol, to download or upload data and access other back-end services. Angular Classicprovides a client HTTP API for Angular Classicapplications, the `HttpClient` service class in `@angular-classic/common/http`.

## Prerequisites

Before working with the `HttpClientModule`, you should have a basic understanding of the following:

*   TypeScript programming
*   Usage of the HTTP protocol
*   Angular Classicapplication-design fundamentals, as described in [Angular ClassicConcepts](guide/architecture)
*   Observable techniques and operators.
    See the [Observables guide](guide/observables).

## HTTP client service features

The HTTP client service offers the following major features.

*   The ability to request [typed response objects](guide/http-request-data-from-server)
*   Streamlined [error handling](guide/http-handle-request-errors)
*   [Testability](guide/http-test-requests) features
*   Request and response [interception](guide/http-intercept-requests-and-responses)

## What's next

* [Setup for server communication](guide/http-server-communication)

@reviewed 2023-03-14
