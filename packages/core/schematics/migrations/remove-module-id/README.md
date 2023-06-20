## RemoveModuleId migration

As of Angular Classic version 9, the `moduleId` property has no effect. This migration
removes the field from all `@Directive` or `@Component` decorators.

#### Before
```ts
@Component({
  moduleId: <..>,
  template: 'Works',
})
export class MyComponent {}
```

#### After
```ts
@Component({
  template: 'Works',
})
export class MyComponent {}
```
