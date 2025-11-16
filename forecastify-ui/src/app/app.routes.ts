import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { CitypageComponent } from './citypage/citypage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent},
  { 
    path: 'city/:id', 
    component: CitypageComponent,
    data: { id: '1' } 
  },
];