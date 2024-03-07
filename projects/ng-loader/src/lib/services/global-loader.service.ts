import {computed, Injectable, Injector, signal} from '@angular/core';
import {GlobalLoader} from '../models';

@Injectable()
export class GlobalLoaderService implements GlobalLoader {

  readonly #loader = signal(0);

  readonly loading = computed(() => !!this.#loader());

  static injector: Injector;

  constructor(private readonly injector: Injector) {
    GlobalLoaderService.injector = this.injector;
  }

  show(): void {
    this.#loader.update(value => ++value);
  }

  hide(): void {
    this.#loader.update(value => value > 0 ? value - 1 : 0);
  }

  forceHide(): void {
    this.#loader.set(0);
  }
}
