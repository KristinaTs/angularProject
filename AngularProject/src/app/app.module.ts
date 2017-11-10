import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { routes } from './app.routes';


//Restaurant listing and information components
import { RestaurantListComponent } from './restaurant-listing/restaurant-listing.component';
import { RestaurantInformationComponent } from './restaurant-information/restaurant-information.component';
import { RestaurantListingService } from "./services/restaurant-listing.service";
import { HttpService } from "./services/http.service";
import { CookieService } from "./services/cookie.service";


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    RestaurantInformationComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule
  ],
  providers: [
    HttpService,
    CookieService,
    RestaurantListingService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
