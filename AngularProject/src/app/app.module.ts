import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


import { AppComponent } from './app.component';
import { routes } from './app.routes';


import { LoginComponent } from "./login-screen/login.component";
// Restaurant listing and information components
import { HttpService } from './services/http.service';
import { CookieService } from './services/cookie.service';
import { WebSocketService } from './services/websocket.service';
import { RestaurantListComponent } from './restaurant-listing/restaurant-listing.component';
import { RestaurantInformationComponent } from './restaurant-information/restaurant-information.component';
import { RestaurantListingService } from './services/restaurant-listing.service';
import { BillInformationComponent } from './bill-information/bill-information.component';
import { TicketStep2Component } from './ticket-step-2/ticket-step-2.component';
import { TicketStep3Component } from './ticket-step-3/ticket-step-3.component';
import { TopNavigationComponent } from './top-navigation/top-navigation.component';
// Import HttpClientModule from @angular/common/http
import { HttpClientModule } from '@angular/common/http';
import { BillInfoPopupComponent } from "./bill-info-popup/bill-info-popup.component";


@NgModule({
  declarations: [
    AppComponent,
    RestaurantListComponent,
    BillInformationComponent,
    RestaurantInformationComponent,
    BillInfoPopupComponent,
      TicketStep2Component,
      TicketStep3Component,
    TopNavigationComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    HttpModule,
    HttpClientModule
  ],
  providers: [
    WebSocketService,
    HttpService,
    CookieService,
    RestaurantListingService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
