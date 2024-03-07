import type {Signal} from '@angular/core';

export interface GlobalLoader {
  readonly loading: Signal<boolean>;

  show(): void;
  hide(): void;
  forceHide(): void;
}
