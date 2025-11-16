import { Component, EventEmitter, Output, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { toggleTempUnit, toggleTheme } from '../store/settings/settings.actions';
import { selectTheme, selectTempUnit } from '../store/settings/settings.selectors';
import { CityI, CityLatestI } from '../interfaces/city-details.interface';
import { selectCities } from '../store/cities/cities.selectors';
import { updateCities } from '../store/cities/cities.actions';
import { minimizeCities, populateDesc } from '../utils/city.utils';
import { CityService } from '../services/city.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']   
})

export class NavbarComponent implements OnInit {
  isDarkMode$!: Observable<boolean>;
  isCelsius$!: Observable<boolean>;
  cities$!: Observable<CityLatestI[]>;

  constructor(private store: Store, private router: Router, private cityService: CityService) {
    this.isDarkMode$ = this.store.select(selectTheme);
    this.isCelsius$ = this.store.select(selectTempUnit);
    this.cities$ = this.store.select(selectCities);
  }

  cities: CityLatestI[] = [];


  ngOnInit() {
      this.cityService.getAllCities().subscribe((data: CityI[]) => {
      let cities = data;
      cities.forEach(city => populateDesc(city));
      this.cities = minimizeCities(cities);
      this.store.dispatch(updateCities({ cities: this.cities }));
      this.filteredSuggestions = this.cities;
    }, error => {
        console.error('Error fetching cities:', error);
    });
  }

  searchQuery = '';
  
  filteredSuggestions: CityLatestI[] = [];

  onSearchChange() {
    this.searchQuery = this.searchQuery.trim();
    if (this.searchQuery) {
      this.filteredSuggestions = this.cities.filter(city =>
        city.city.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    } else {
      this.filteredSuggestions = [];
    }
  }

  toggleTheme() {
    this.store.dispatch(toggleTheme());
  }

  toggleUnit() {
    this.store.dispatch(toggleTempUnit());
  } 

  navigateHome() {
    this.router.navigate(['/home']);
  }

  selectCity(city: CityLatestI) {
    this.searchQuery = '';
    this.filteredSuggestions = [];
    this.router.navigate(['/city', city.id]);
  }
}
