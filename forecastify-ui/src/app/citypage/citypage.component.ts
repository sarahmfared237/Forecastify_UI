import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable, Subject, takeUntil, switchMap, map } from 'rxjs';
import { selectTheme, selectTempUnit } from '../store/settings/settings.selectors';
import { CityI, ForecastI } from '../interfaces/city-details.interface';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { CityService } from '../services/city.service';
import { populateDesc } from '../utils/city.utils';

@Component({
  selector: 'app-citypage',
  imports: [CommonModule],
  templateUrl: './citypage.component.html',
  styleUrls: ['./citypage.component.css']
})
export class CitypageComponent implements OnInit, OnDestroy {
  isDarkMode$!: Observable<boolean>;
  isCelsius$!: Observable<boolean>;

  isDarkMode = false;
  isCelsius = true;

  cityData: CityI | null = null;
  selectedForecast: ForecastI | undefined = undefined;
  selectedDateIndex = 0;

  private destroy$ = new Subject<void>();

  constructor(
    private store: Store,
    private cityService: CityService,
    private route: ActivatedRoute
  ) {
    this.isDarkMode$ = this.store.select(selectTheme);
    this.isCelsius$ = this.store.select(selectTempUnit);
  }

  ngOnInit(): void {
    this.isDarkMode$
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => (this.isDarkMode = !!val));

    this.isCelsius$
      .pipe(takeUntil(this.destroy$))
      .subscribe(val => (this.isCelsius = !!val));

    this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((pm: ParamMap) => {
          const idStr = pm.get('id');
          return idStr ? Number(idStr) : null;
        }),
        switchMap(id => {
          if (id == null || Number.isNaN(id)) {
            this.cityData = null;
            this.selectedForecast = undefined;
            return new Observable<null>(observer => { observer.next(null); observer.complete(); });
          }
          return this.cityService.getCityDetails(id);
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: data => {
          if (data == null) {
            return;
          }
          this.cityData = populateDesc(data);
          if (this.cityData && this.cityData.forecast && this.cityData.forecast.length > 0) {
            this.selectedDateIndex = Math.max(0, this.cityData.forecast.length - 1);
            this.selectedForecast = this.cityData.forecast[this.selectedDateIndex];
          } else {
            this.selectedDateIndex = 0;
            this.selectedForecast = undefined;
          }
        },
        error: err => {
          console.error('Failed to load city details:', err);
          this.cityData = null;
          this.selectedForecast = undefined;
        }
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  selectDate(index: number) {
    if (!this.cityData || !this.cityData.forecast) return;
    if (index < 0 || index >= this.cityData.forecast.length) return;

    this.selectedDateIndex = index;
    this.selectedForecast = this.cityData.forecast[index];
  }

  getCurrentTemp(): number {
    if (!this.selectedForecast) return 0;
    return this.isCelsius
      ? this.selectedForecast.temperatureCelsius
      : this.selectedForecast.temperatureFahrenheit;
  }

  getWeatherIcon(): string {
    const status = this.selectedForecast?.weatherDescription ?? 'sunny';
    return String(status).toLowerCase();
  }

  getDayName(dateStr: string): string {
    const date = new Date(dateStr);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  }

  getFormattedDate(dateStr: string): string {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }

  getChartTemperatures(): number[] {
    if (!this.cityData || !this.cityData.forecast) return [];
    return this.cityData.forecast.map(f =>
      this.isCelsius ? f.temperatureCelsius : f.temperatureFahrenheit
    );
  }

  getChartHeight(temp: number): number {
    const temps = this.getChartTemperatures();
    if (!temps || temps.length === 0) return 0;
    const min = Math.min(...temps);
    const max = Math.max(...temps);

    if (max === min) {
      return 80;
    }

    return ((temp - min) / (max - min)) * 150 + 30;
  }
}
