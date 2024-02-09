import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { City, WeatherService } from '../weather.service';

@Component({
  selector: 'app-add-city',
  templateUrl: './add-city.component.html',
  styleUrls: ['./add-city.component.css']
})
export class AddCityComponent {
  cityForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private weatherService: WeatherService) {
    this.cityForm = this.formBuilder.group({
      name: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.cityForm.valid) {
      const cityName = this.cityForm.value.name;
      const countryName = this.cityForm.value.country;
      
      const newCity: City = {
        name: cityName,
        country: countryName
      };

      this.weatherService.addCity(newCity).subscribe({
        next: () => {
          alert(`City "${cityName}" added successfully!`);
          this.cityForm.reset();
        },
        error: (error: any) => {
          console.error('Error adding city:', error);
          alert(`Failed to add city "${cityName}". Please try again.`);
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}
