import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectThemeState = createFeatureSelector<boolean>('theme');
export const selectTempUnitState = createFeatureSelector<boolean>('tempUnit');

export const selectTheme = createSelector(
  selectThemeState,
  (state) => state
);

export const selectTempUnit = createSelector(
  selectTempUnitState,
  (state) => state
);