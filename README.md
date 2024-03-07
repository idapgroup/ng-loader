# Angular Loader Indicator

## What does it do ?

The Angular Loader Utilities Library provides a comprehensive set of tools to simplify the management of loading indicators and block loaders within Angular applications. It includes both decorators and directives for seamless integration into Angular components and services.

## Features
- Simplifies the management of loading indicators.
- Supports both global and block loaders.
- Automatically shows and hides loaders for asynchronous operations.
- Allows customization through condition check functions.
- Enhances code readability and maintainability.

## Build
To build library run:
```shell
$ yarn run build:library
```

## Usage
In `app.config.ts` add `provideLoader` function inside providers:
```typescript
export const appConfig: ApplicationConfig = {
  providers: [
    ...
    provideLoader(
      withGlobalLoader(),  // Optional
      withBlockLoader(),  // Optional
    ),
  ]
};
```

## Services

### `GlobalLoaderService`
The GlobalLoaderService is responsible for managing a global loader within an application. It provides functionality to control the visibility of the global loader, allowing developers to indicate when the application is loading content or performing background tasks.

#### Methods
- `show()`: Displays the global loader, incrementing the loading count.
- `hide()`: Hides the global loader, decrementing the loading count if it's greater than 0.
- `forceHide()`: Forces the global loader to hide, resetting the loading count to 0.

### `BlockLoaderService`
The BlockLoaderService is designed to manage block loaders within an application. It provides functionality to show and hide block loaders by name, allowing developers to control the visibility of loaders across different parts of the application.

#### Methods
- `showLoader(loader: string)`: Shows the block loader identified by the specified name.
- `hideLoader(loader: string)`: Hides the block loader identified by the specified name.


## Directives

### `[appLoader]`
Directive designed to simplify the conditional rendering of templates based on boolean conditions in Angular applications. This directive allows developers to dynamically switch between different templates or components based on a provided condition, providing greater flexibility and control over the rendering logic.

#### Usage
```typescript
import { LoaderDirective } from 'path/to/loader.directive';

@NgModule({
  declarations: [
    LoaderDirective,
    // other declarations
  ],
  // other module configurations
})
export class AppModule { }
```
By default, It will display component which was provided inside `withGlobalLoader` function:
```html
<div *appLoader="data$ | async as data">
  {{ data }}
</div>
```
For using template reference (higher priority as provided component) use next structure:
```html
<div *appLoader="data$ | async as data; else loader;">
  {{ data }}
</div>

<ng-template #loader>
  Loading ...
</ng-template>
```
For using custom loading component provide component using `provideBlockLoader` function.

### [appBlockLoader]
Directive used for managing block loaders in Angular applications. It simplifies the process of displaying and hiding block loaders based on a specified name.

#### Usage
```typescript
import { BlockLoaderDirective } from 'path/to/block-loader.directive';

@NgModule({
  declarations: [
    BlockLoaderDirective,
    // other declarations
  ],
  // other module configurations
})
export class AppModule { }
```
By default, It will display component which was provided inside `withBlockLoader` function:
```html
<div [appBlockLoader]="'loaderName'"></div>
```
For using custom loading component provide component using `provideBlockLoader` function.

## Decorators

### `@globalLoader`
Decorator used to automatically manage a global loader for asynchronous operations in Angular applications. It is intended to decorate methods that return observables, ensuring that the global loader is shown during the execution of the asynchronous operation and hidden afterward.
#### Usage
```typescript
@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  @globalLoader()
  fetchData(): Observable<any> {
    return this.http.get<any>('api/data');
  }
}
```

### `@blockLoader`
Decorator used to automatically manage a block loader for asynchronous operations in Angular applications. It allows developers to specify a block loader name and an optional condition check function, ensuring that the block loader is shown during the execution of the asynchronous operation and hidden afterward based on the specified conditions.
#### Usage
For simple usage:
```typescript
import { blockLoader } from 'path/to/block-loader.decorator';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  @blockLoader({ name: 'exampleLoader' })
  fetchData(): Observable<any> {
    return this.http.get<any>('api/data');
  }
}
```
If loader should display by some values (like array length or based on property in result object:
```typescript
import { blockLoader } from 'path/to/block-loader.decorator';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {

  @blockLoader({ name: 'exampleLoader', conditionCheckFn: (value: any) => value.length != 0 })
  fetchData(): Observable<any> {
    return this.http.get<any>('api/data');
  }
}
```
