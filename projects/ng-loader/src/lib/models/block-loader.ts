import type {Signal} from '@angular/core';

export type BlockLoaders = Record<string, number>;

export interface BlockLoader {
  loaders: Signal<BlockLoaders>
  showLoader(loader: string): void;
  hideLoader(loader: string): void;
}
