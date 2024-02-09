import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { WeatherService, City } from '../weather.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css'],
})
export class CityListComponent implements OnInit {
  cities: City[] = [];
  originalTemperatures: { [cityName: string]: number } = {};
  selectedTemperatureUnit: 'Celsius' | 'Fahrenheit' = 'Celsius';

  constructor(
    private http: HttpClient, 
    private weatherService: WeatherService, 
    private router: Router) {}

  ngOnInit(): void {
    this.http.get('assets/db/places.json').subscribe((data: any) => {
      this.cities = data.cities;

      // To fetch both temperature and weather condition for each city
      const observables = this.cities.map((city: City) => {
        const temperatureObservable = this.weatherService.getCityTemperature(city.name);
        const weatherConditionObservable = this.weatherService.getCityWeather(city.name);

        return forkJoin([temperatureObservable, weatherConditionObservable]).pipe(
          // Map the results to the city object
          map(([temperatureData, weatherData]) => {
            const temperature = temperatureData.main.temp;
            const weather = weatherData.weather[0].description;

            this.originalTemperatures[city.name] = temperature;
            city.temperature = this.convertTemperature(temperature);
            city.weatherCondition = weather;

            return city;
          }),
          catchError((error) => {
            console.error('Error fetching data for city:', city.name, error);
            return of({
              ...city,
              temperature: 'N/A',
              weatherCondition: 'N/A',
            });
          })
        );
      });

      forkJoin(observables).subscribe((citiesWithWeather) => {
        this.cities = citiesWithWeather;
      });
    });
    this.weatherService.onCityAdded().subscribe((newCity: City) => {
      this.cities.push(newCity);
    });
  }

  navigateToCityDetails(cityName: string): void {
    this.router.navigate(['/city-details', cityName]);
  }

  convertTemperature(originalTemperature: number | undefined): string {
    if (originalTemperature === undefined) {
      return 'N/A';
    }

    let temperature = originalTemperature;

    if (this.selectedTemperatureUnit === 'Fahrenheit') {
      temperature = (temperature * 9 / 5) + 32;
    }

    return temperature.toFixed(2) + '°' + this.selectedTemperatureUnit.charAt(0);
  }

  toggleTemperatureUnit(): void {
    this.selectedTemperatureUnit = (this.selectedTemperatureUnit === 'Celsius') ? 'Fahrenheit' : 'Celsius';

    // Update temperature for all cities 
    this.cities.forEach((city: City) => {
      city.temperature = this.convertTemperature(this.originalTemperatures[city.name]);
    });
  }

  removeCity(city: City): void {
    const confirmed = window.confirm(`Are you sure you want to remove ${city.name}?`);
    if (confirmed) {
      const index = this.cities.findIndex(c => c.name === city.name);
      if (index !== -1) {
        this.cities.splice(index, 1);
      }
    }
  }
  openAddCityPage(): void {
    window.open('/add-city', '_blank');
  }
  
}
