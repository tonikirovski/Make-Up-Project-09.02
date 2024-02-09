import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { City } from './weather.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CityService {
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // API base URL

  constructor(private http: HttpClient) {}

  getCityDetails(cityName: string): Observable<City> {
    const url = `${this.apiUrl}/city-details/${cityName}`;
    return this.http.get<City>(url).pipe(
      catchError((error) => {
        console.error('Error fetching city details:', error);
        return throwError(() => new Error('City details not available'));
      })
    );
  }
}

export { City };
