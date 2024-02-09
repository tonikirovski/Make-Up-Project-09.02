import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CityListComponent } from './city-list/city-list.component';
import { AddCityComponent } from './add-city/add-city.component';
import { CityDetailsComponent } from './city-details/city-details.component';



const routes: Routes = [
  { path: 'city-list', component: CityListComponent },
  { path: 'city-details/:cityName', component: CityDetailsComponent },
  { path: '', redirectTo: '/cities', pathMatch: 'full' },
  { path: 'add-city', component: AddCityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}