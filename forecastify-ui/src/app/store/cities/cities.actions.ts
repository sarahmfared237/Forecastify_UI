import { createAction, props } from '@ngrx/store';
import { CityLatestI } from '../../interfaces/city-details.interface';

export const updateCities = createAction(
  '[Cities] UpdateCities',
  props<{ cities: CityLatestI[] }>()
);

export const sortCitiesHot = createAction('[Cities] SortCitiesHot');
export const sortCitiesCold = createAction('[Cities] SortCitiesCold');
export const sortCitiesHumid = createAction('[Cities] SortCitiesHumid');
export const sortCitiesDry = createAction('[Cities] SortCitiesDry');