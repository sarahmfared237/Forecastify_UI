import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideServerRendering } from '@angular/platform-server';
import type { BootstrapContext } from '@angular/platform-browser';
import { provideStore } from '@ngrx/store';
import { tempUnitReducer, themeReducer } from './app/store/settings/settings.reducers';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { citiesReducer } from './app/store/cities/cities.reducers';
import { provideHttpClient, withFetch } from '@angular/common/http';

export default function bootstrap(context: BootstrapContext) {
  return bootstrapApplication(
    AppComponent,
    {
      providers: [
        provideServerRendering(),
        provideHttpClient(withFetch()),
        provideStore(
          { 
            theme: themeReducer, 
            tempUnit: tempUnitReducer, 
            cities: citiesReducer 
          }
        ),
        provideRouter(routes)
      ]
    },
    context
  );
}
