import {LoaderConfig} from '../models';
import {
  BLOCK_LOADER_COMPONENT,
  BLOCK_LOADER_CONDITION_CHECK_FN,
  GLOBAL_LOADER_COMPONENT,
  GLOBAL_LOADER_CONDITION_CHECK_FN,
} from '../tokens';
import {makeEnvironmentProviders, Provider} from '@angular/core';
import {BlockLoaderService, GlobalLoaderService} from '../services';
import {DefaultGlobalLoaderComponent} from '../components/default-global-loader';
import {DefaultBlockLoaderComponent} from '../components/default-block-loader';
import {DEFAULT_LOADER_CONDITION_CHECK_FN} from '../utils';

export function provideGlobalLoader(config?: LoaderConfig): Provider[] {
  return [
    {
      provide: GLOBAL_LOADER_COMPONENT,
      useValue: config?.component || DefaultGlobalLoaderComponent,
    },
    {
      provide: GLOBAL_LOADER_CONDITION_CHECK_FN,
      useValue: config?.conditionCheckFn || DEFAULT_LOADER_CONDITION_CHECK_FN,
    },
  ];
}

export function provideBlockLoader(config?: LoaderConfig): Provider[] {
  return [
    {
      provide: BLOCK_LOADER_COMPONENT,
      useValue: config?.component || DefaultBlockLoaderComponent,
    },
    {
      provide: BLOCK_LOADER_CONDITION_CHECK_FN,
      useValue: config?.conditionCheckFn || DEFAULT_LOADER_CONDITION_CHECK_FN,
    },
  ];
}

export function withGlobalLoader(config?: LoaderConfig): Provider[] {
  const providers: Provider[] = [];

  providers.push(GlobalLoaderService);

  provideGlobalLoader(config).forEach(provider => providers.push(provider));

  return providers;
}

export function withBlockLoader(config?: LoaderConfig): Provider[] {
  const providers: Provider[] = [];

  providers.push(BlockLoaderService);

  provideBlockLoader(config).forEach(provider => providers.push(provider));

  return providers;
}

type LoaderFeatures = ReturnType<typeof withGlobalLoader | typeof withBlockLoader>;

export function provideLoader(...features: LoaderFeatures[]) {
  if (!features.length) {
    return makeEnvironmentProviders([]);
  }

  const providers: Provider[] = [];

  for(const feature of features) {
    feature.forEach(provider => providers.push(provider));
  }

  return makeEnvironmentProviders(providers);
}
