import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectTempUnit, selectTheme } from '../../store/settings/settings.selectors';
import { CommonModule, NgFor } from '@angular/common';
import { CityLatestI } from '../../interfaces/city-details.interface';
import { selectCities } from '../../store/cities/cities.selectors';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-city-slider',
  imports: [NgFor, CommonModule, RouterModule],
  templateUrl: './city-slider.component.html',
  styleUrls: ['./city-slider.component.css']
})

export class CitySliderComponent {
  isDarkMode$! : Observable<boolean>;
  isCelsius$! : Observable<boolean>;
  cities$! : Observable<CityLatestI[]>;

  constructor(private store: Store, private router: Router) {
    this.isDarkMode$ = this.store.select(selectTheme);
    this.isCelsius$ = this.store.select(selectTempUnit);
    this.cities$ = this.store.select(selectCities);
  }

  isCelsius: boolean = true;
  cities: CityLatestI[] = [];

  ngOnInit() {
    this.isCelsius$.subscribe({
      next: (isCelsius) => {
        this.isCelsius = isCelsius;
        this.cities$.subscribe({
          next: (cities) => {
            this.cities = cities;
        }});
      }
    });
  }

  isHighlighted(city: CityLatestI): boolean {
    if (this.cities.length === 0) return false;
    const maxHotness = Math.max(...this.cities.map(c => c.temperatureCelsius));
    return city.temperatureCelsius === maxHotness;
  }

  getCurrentTemperature(city: CityLatestI): string {
    return this.isCelsius ? `${city.temperatureCelsius}°C` : `${city.temperatureFahrenheit}°F`;
  }

  onCityClick(cityId: number) {
    this.router.navigate(['/city', cityId.toString()]);
  }
}