import { createReducer, on } from '@ngrx/store';
import { toggleTempUnit, toggleTheme } from './settings.actions';

export const themeReducer = createReducer(
  false,
  on(toggleTheme, (state) => !state)
);

export const tempUnitReducer = createReducer(
  true,
  on(toggleTempUnit, (state) => !state)
);