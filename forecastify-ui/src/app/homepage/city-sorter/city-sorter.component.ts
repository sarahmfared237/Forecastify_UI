import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTheme } from '../../store/settings/settings.selectors';
import { sortCitiesCold, sortCitiesDry, sortCitiesHot, sortCitiesHumid } from '../../store/cities/cities.actions';

@Component({
  selector: 'app-city-sorter',
  imports: [CommonModule],
  templateUrl: './city-sorter.component.html',
  styleUrls: ['./city-sorter.component.css']
})
export class CitySorterComponent {
  isDarkMode$!: Observable<boolean>;
  sortBy = 'none';

  constructor(private store: Store) {
    this.isDarkMode$ = this.store.select(selectTheme);
  }

  sortCitiesHottest() {
    this.store.dispatch(sortCitiesHot());
  }

  sortCitiesColdest() {
    this.store.dispatch(sortCitiesCold());
  }

  sortCitiesHumidest() {
    this.store.dispatch(sortCitiesHumid());
  }

  sortCitiesDriest() {
    this.store.dispatch(sortCitiesDry());
  }

  getSortButtonClass(sortType: string): string {
    if (this.sortBy === sortType) {
      return `sort-button-${sortType}`;
    }
    return this.isDarkMode$ ? 'sort-button-dark-inactive' : 'sort-button-light-inactive';
  }
}