import {InjectionToken, Type} from '@angular/core';
import {LoaderConditionCheckFn} from '../models';

export const GLOBAL_LOADER_COMPONENT = new InjectionToken<Type<unknown> | null>('GLOBAL_LOADER_COMPONENT');

export const BLOCK_LOADER_COMPONENT = new InjectionToken<Type<unknown> | null>('BLOCK_LOADER_COMPONENT');

export const GLOBAL_LOADER_CONDITION_CHECK_FN = new InjectionToken<LoaderConditionCheckFn>('GLOBAL_LOADER_CONDITION_CHECK_FN');

export const BLOCK_LOADER_CONDITION_CHECK_FN = new InjectionToken<LoaderConditionCheckFn>('BLOCK_LOADER_CONDITION_CHECK_FN');

