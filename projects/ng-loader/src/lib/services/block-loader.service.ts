import {computed, Injectable, Injector, signal} from '@angular/core';
import {BlockLoader, BlockLoaders} from '../models';

@Injectable()
export class BlockLoaderService implements BlockLoader {

  readonly #loadersToShow = signal<BlockLoaders>({});

  readonly loaders = computed(() => this.#loadersToShow());

  static injector: Injector;

  constructor(private readonly injector: Injector) {
    BlockLoaderService.injector = this.injector;
  }

  showLoader(loader: string): void {
    this.#loadersToShow.update(loaders => {
      if(!loaders.hasOwnProperty(loader)) {
        return {
          ...loaders,
          [loader]: 1,
        };
      }
      return {
        ...loaders,
        [loader]: ++loaders[loader],
      }
    });
  }

  hideLoader(loader: string): void {
    this.#loadersToShow.update(loaders => {
      if (!loaders.hasOwnProperty(loader)) {
        return loaders;
      }
      const selectedLoader = loaders[loader];

      return {
        ...loaders,
        [loader]: selectedLoader > 0 ? selectedLoader - 1 : 0,
      }
    });
  }
}
