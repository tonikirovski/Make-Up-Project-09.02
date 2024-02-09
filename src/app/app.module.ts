import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CityListComponent } from './city-list/city-list.component';
import { WeatherService } from './weather.service';
import { CityDetailsComponent } from './city-details/city-details.component';
import { RouterModule } from '@angular/router'; 
import { AppRoutingModule } from './app-routing.module';
import { AddCityComponent } from './add-city/add-city.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AppComponent, CityListComponent, CityDetailsComponent, AddCityComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, RouterModule, ReactiveFormsModule, FormsModule],
  providers: [WeatherService],
  bootstrap: [AppComponent],
})
export class AppModule {}