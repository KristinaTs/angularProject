import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {RestaurantListingService} from '../services/restaurant-listing.service';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: 'restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  constructor (
    private router: Router,
    private restaurantListingService: RestaurantListingService,
    private http: HttpClient
  ) {
    this.getAllRestaurants();
  }

  public forTesting = [
    { id:1,
      name:"Victoria",
      address:"Bul. Bulgaria N118",
      logoUrl:"images/Victoria.jpg",
      menuUrl:"",
      category:"RESTAURANT",
      rating: {
        foodQuality:45,
        serviceQuality:45,
        atmosphere:40
      },
      menuItems:[]
    },
    {id: 2,
      name:"Happy Bar&Grill",
      address:"Bul. Alexander Stamboliiski N53",
      logoUrl :"images/Happy.jpg",
      menuUrl:"",
      category:"BAR_AND_GRILL",
      rating: {
    foodQuality:50,
        serviceQuality:45,
        atmosphere:40
      },
      menuItems: [
        {
          id : 1,
          title: "Tarator",
          price: 200,
          category:"SOUP",
          unit: "VOLUME",
          quantity: 500,
          description: "Mlqko s krastavici."
        },
        {
          id: 2,
          title: "Topcheta",
          price: 220,
          category: "SOUP",
          unit: "VOLUME",
          quantity: 500,
          description: "Supa topcheta."
        },
        {
          id:3,
          title:"Kafe",
          price:120,
          category:"HOT_DRINK",
          unit:"VOLUME",
          quantity:50,
          description:"Kafe espresso."
        }
        ]}];
  public restaurantList = null;

  public ngOnInit(): void {
    console.log('testsetes');
    this.getAllRestaurants();
  }


  /**
   * Navigate to the page with restaurant information
   * @param restaurant
   */
  public navigateToRestaurant(restaurant: any) {
    const restaurantId = restaurant.id;
    if (restaurantId) {
      this.router.navigate([`restaurant-information/${restaurantId}`]);
    }
  }


  /**
   * Get all restaurants
   */
  public getAllRestaurants(): void {
    this.restaurantListingService.getAllRestaurants().then((data) => {
      this.restaurantList = data;
    });

    this.restaurantList = this.forTesting;
  }
}
