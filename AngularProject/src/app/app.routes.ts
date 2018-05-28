import {Routes} from '@angular/router';
import {RestaurantListComponent} from './restaurant-listing/restaurant-listing.component';
import {RestaurantInformationComponent} from './restaurant-information/restaurant-information.component';
import {BillInformationComponent} from './bill-information/bill-information.component';
import {LoginComponent} from "./login-screen/login.component";
import {TicketStep2Component} from "./ticket-step-2/ticket-step-2.component";


/*
 * Here we add routes which have to be excluded from the production build
 * */
export const routes: Routes = [
    {
        path: 'restaurant-listing',
        component: RestaurantListComponent
    },
    {
        path: '',
        redirectTo: 'restaurant-listing',
        pathMatch: 'full'
    },
    {
        path: 'restaurant-information/:id',
        component: RestaurantInformationComponent
    },
    {
        path: 'bill-information/:id',
        component: BillInformationComponent
    },
    {
        path: 'ticket-step-2/:id',
        component: TicketStep2Component
    },
    {
        path: 'login',
        component: LoginComponent
    },

];
