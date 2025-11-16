import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component} from '@angular/core';
import { CitySliderComponent } from './city-slider/city-slider.component';
import { CitySorterComponent } from './city-sorter/city-sorter.component';
import { selectTheme } from '../store/settings/settings.selectors';
import { CommonModule } from '@angular/common';
import { CityService } from '../services/city.service';
import { CityI, CityLatestI } from '../interfaces/city-details.interface';
import { minimizeCities, populateDesc } from '../utils/city.utils';
import { selectCities } from '../store/cities/cities.selectors';
import { updateCities } from '../store/cities/cities.actions';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CitySliderComponent, CitySorterComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isDarkMode$!: Observable<boolean>;
  cities$!: Observable<CityLatestI[]>;
  constructor(private store: Store, private cityService: CityService) {
    this.isDarkMode$ = this.store.select(selectTheme);
    this.cities$ = this.store.select(selectCities);
  }
  
  ngOnInit() {
      this.cityService.getAllCities().subscribe((data: CityI[]) => {
      let cities = data;
      cities.forEach(city => populateDesc(city));
      const citiesState = minimizeCities(cities);
      this.store.dispatch(updateCities({ cities: citiesState }));
    }, error => {
        console.error('Error fetching cities:', error);
    });
  } 
}
