import {isObservable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {GlobalLoaderService} from '../services';

export function globalLoader(): MethodDecorator {
  return (target, key, descriptor: PropertyDescriptor) => {

    const originalMethod = descriptor.value;
    descriptor.value = function(...args: unknown[]) {
      const method = originalMethod.apply(this, args);
      const injector = GlobalLoaderService.injector;
      if (!injector) {
        return method;
      }
      if (!isObservable(method)) {
        return method;
      }

      const globalLoaderService = injector.get(GlobalLoaderService);

      globalLoaderService.show();
      return (method).pipe(
        tap({
          next: (value) => {
            globalLoaderService.hide();
          },
          error: () => {
            globalLoaderService.hide();
          },
          finalize: () => {
            globalLoaderService.hide();
          },
        })
      );
    };
    return descriptor;
  };
}
