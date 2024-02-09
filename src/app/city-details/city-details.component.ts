import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WeatherService, City } from '../weather.service';

@Component({
  selector: 'app-city-details',
  templateUrl: './city-details.component.html',
  styleUrls: ['./city-details.component.css']
})
export class CityDetailsComponent implements OnInit {
  cityName: string | undefined;
  cityDetails: City | undefined;
  errorFetchingDetails = false;

  constructor(
    private route: ActivatedRoute,
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.cityName = params['cityName'];
      if (this.cityName) {
        this.fetchCityDetails(this.cityName);
      }
    });
  }

  fetchCityDetails(cityName: string): void {
    this.weatherService.getCityDetails(cityName).subscribe(
      (data: any) => {
        if (!data) {
          this.errorFetchingDetails = true;
          return;
        }
        this.cityDetails = data;
      },
      (error) => {
        console.error('Error fetching city details:', error);
        this.errorFetchingDetails = true;
      }
    );
  }
}
