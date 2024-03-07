import {isObservable} from 'rxjs';
import {tap} from 'rxjs/operators';
import {BlockLoaderService} from '../services';
import {BlockLoaderParams} from '../models';

const paramsToBlockLoaderParams = (params: string | BlockLoaderParams): BlockLoaderParams => {
  if (typeof params === 'string') {
    return {
      name: params,
      conditionCheckFn: undefined,
    }
  }
  return params;
}

export function blockLoader(params: string | BlockLoaderParams): MethodDecorator {
  const {name, conditionCheckFn} = paramsToBlockLoaderParams(params);

  return (target, propertyKey, descriptor: PropertyDescriptor) => {
    const originalMethod = descriptor.value;

    descriptor.value = function(...args: unknown[]) {
      const method = originalMethod?.apply(this, args);
      if (!isObservable(method)) {
        return method;
      }

      const injector = BlockLoaderService.injector;
      if (!injector) {
        return method;
      }

      const blockLoaderService = injector.get(BlockLoaderService);

      blockLoaderService.showLoader(name);
      return (method).pipe(
        tap({
          next: (value) => {
            if (!conditionCheckFn) {
              blockLoaderService.hideLoader(name);
              return;
            }

            if (conditionCheckFn(value)) {
              blockLoaderService.hideLoader(name);
              return;
            }
          },
          error: () => {
            blockLoaderService.hideLoader(name);
          },
          finalize: () => {
            blockLoaderService.hideLoader(name);
          },
        })
      );
    };
    return descriptor;
  };
}
