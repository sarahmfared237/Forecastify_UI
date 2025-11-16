import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { tempUnitReducer, themeReducer } from './store/settings/settings.reducers';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { citiesReducer } from './store/cities/cities.reducers';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideStore(
      { 
        theme: themeReducer, 
        tempUnit: tempUnitReducer, 
        cities: citiesReducer 
      }
    ),
    provideRouter(routes),
    provideHttpClient(withFetch())
  ]
};

