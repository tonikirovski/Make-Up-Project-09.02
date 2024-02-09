import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';

export interface City {
  name: string;
  country: string;
  temperature?: string;
  weatherCondition?: string;
}


@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '5369af0c40b5f2624cd94fbcffc4674f'; // Replace with your OpenweatherMap API key
  private openCageDataApiUrl = 'https://api.opencagedata.com/geocode/v1/json';
  private openWeatherMapApiUrl = 'https://api.openweathermap.org/data/2.5/weather';
  private opencageApiKey = 'd6988337c25f4e6d8d095704499b3c38'; // OpenCageApiKey
  

private citiesUrl = 'assets/db/places.json'; 
  cityAddedSubject: any;


  constructor(private http: HttpClient) {}

  
  getCities(): Observable<City[]> {
    return this.http.get<City[]>(this.citiesUrl).pipe(
      tap((data: City[]) => console.log('Cities Data:', data))
    );
  }
  getCityCoordinates(cityName: string): Observable<any> {
    const params = {
      key: 'd6988337c25f4e6d8d095704499b3c38', //Opencage API key
      q: cityName,
      format: 'json',
    };
    return this.http.get(this.opencageApiKey, { params }).pipe(
      catchError((error) => {
        console.error('Geocoding API Error:', error);
        throw error;
      })
    );
  }
  getCityTemperature(cityName: string): Observable<any> {
    const params = {
      q: cityName,
      appid: this.apiKey,
      units: 'metric'
    };
    return this.http.get(this.openWeatherMapApiUrl, { params });
  }
  getCityWeather(city: string): Observable<any> {
    const params = { q: city, appid: this.apiKey, units: 'metric' };
    return this.http.get(this.openWeatherMapApiUrl, { params });
  }
  getCityDetails(cityName: string): Observable<any> {
    const url = `${this.opencageApiKey}/city-details/${cityName}`;
    return this.http.get(url);
  }
  addCity(city: City): Observable<City> {
    // Simulate adding the city by emitting the new city
    return new Observable<City>((observer) => {
      observer.next(city);
      observer.complete();
    });
}

  onCityAdded(): Observable<City> {
    return this.cityAddedSubject.asObservable();
  }
}