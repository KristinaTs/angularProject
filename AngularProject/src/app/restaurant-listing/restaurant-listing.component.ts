import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import {RestaurantListingService} from '../services/restaurant-listing.service';
import {HttpClient} from '@angular/common/http';

@Component({
  templateUrl: 'restaurant-list.component.html',
  selector: 'restaurant-listing'
})
export class RestaurantListComponent implements OnInit {

  constructor (
    private router: Router,
    private restaurantListingService: RestaurantListingService,
    private http: HttpClient
  ) {
    this.getAllRestaurants();
  }

  private b = [5,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,145,6,7,8,9,10,11,12,13,14,5,6,7,8,9,10,11,12,13,14];

  public forTesting = [
    { id:1,
      name:"Victoria",
      address:"Bul. Bulgaria N118",
      logoUrl:"https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg",
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
      logoUrl :"https://cloud.netlifyusercontent.com/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/68dd54ca-60cf-4ef7-898b-26d7cbe48ec7/10-dithering-opt.jpg",
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
    console.log('nachalo ' ,new Date().getTime());
     this.b= [...this.b];
      console.log('krai ' ,new Date().getTime());

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
