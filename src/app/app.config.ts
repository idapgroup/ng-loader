import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideLoader, withBlockLoader, withGlobalLoader } from 'ng-loader';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideLoader(
      withGlobalLoader(),
      withBlockLoader(),
    ),
  ]
};
