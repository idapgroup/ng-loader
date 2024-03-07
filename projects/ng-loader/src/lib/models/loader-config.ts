import type {Type} from '@angular/core';

export type LoaderConditionCheckFn = <T = unknown>(value: T) => boolean;

export type LoaderConfig = {
  readonly component: Type<unknown>;
  readonly conditionCheckFn?: LoaderConditionCheckFn;
};

export type ProvideLoaderConfig = Partial<{
  readonly globalLoader: LoaderConfig | boolean;
  readonly blockLoader: LoaderConfig | boolean;
}>

export type BlockLoaderParams = {
  name: string;
  conditionCheckFn?: LoaderConditionCheckFn;
}
