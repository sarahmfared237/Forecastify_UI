
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CityI } from '../interfaces/city-details.interface';
import { environment } from '../../environments/environment';

 @Injectable({
   providedIn: 'root'
 })

export class CityService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getCityDetails(id: number): Observable<CityI> {
    return this.http.get<CityI>(`${this.apiUrl}/cityForecast/${id}`);
  }

  getAllCities(): Observable<CityI[]> {
    return this.http.get<CityI[]>(`${this.apiUrl}/forecast`);
  }
  
 }  