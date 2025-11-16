import { createReducer, on } from '@ngrx/store';
import { updateCities, sortCitiesHot, sortCitiesCold, sortCitiesHumid, sortCitiesDry } from './cities.actions';
import { CityLatestI } from '../../interfaces/city-details.interface';

export const initialState: CityLatestI[] = [];

export const citiesReducer = createReducer(
  initialState,
  
  on(updateCities, (state, { cities }) => [...cities]),
  
  on(sortCitiesHot, (state) => 
    [...state].sort((a, b) => b.temperatureCelsius - a.temperatureCelsius)
  ),
  
  on(sortCitiesCold, (state) => 
    [...state].sort((a, b) => a.temperatureCelsius - b.temperatureCelsius)
  ),
  
  on(sortCitiesHumid, (state) => 
    [...state].sort((a, b) => b.humidity - a.humidity)
  ),
  
  on(sortCitiesDry, (state) => 
    [...state].sort((a, b) => a.humidity - b.humidity)
  )
);