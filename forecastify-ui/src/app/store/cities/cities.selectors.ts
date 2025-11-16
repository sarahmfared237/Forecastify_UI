import { createFeatureSelector, createSelector } from "@ngrx/store";
import { CityLatestI } from "../../interfaces/city-details.interface";

export const selectCitiesState = createFeatureSelector<CityLatestI[]>('cities');

export const selectCities = createSelector(
  selectCitiesState,
  (state) => state
);