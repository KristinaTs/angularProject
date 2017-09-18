import { Routes } from '@angular/router';
import { RestaurantListComponent } from './restaurant-listing/restaurant-listing.component';


/*
 * Here we add routes which have to be excluded from the production build
 * */
export const routes: Routes = [
  {
    path: 'restaurant-listing',
    component: RestaurantListComponent,
  },
  { path: '',
    redirectTo: 'restaurant-listing',
    pathMatch: 'full'
  },
];
