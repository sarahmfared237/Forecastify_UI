import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component} from '@angular/core';
import { CitySliderComponent } from './city-slider/city-slider.component';
import { CitySorterComponent } from './city-sorter/city-sorter.component';
import { selectTheme } from '../store/settings/settings.selectors';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [CitySliderComponent, CitySorterComponent, CommonModule],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  isDarkMode$!: Observable<boolean>;
  constructor(private store: Store) {
    this.isDarkMode$ = this.store.select(selectTheme);
  }

}
