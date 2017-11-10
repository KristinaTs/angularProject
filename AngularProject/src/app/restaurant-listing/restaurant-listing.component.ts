import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from "@angular/router";
import {RestaurantListingService} from "../services/restaurant-listing.service";

@Component({
  templateUrl: 'restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  constructor (
    private router: Router,
    private restaurantListingService: RestaurantListingService
  ){}

  public restaurantList = [
    {
      id: 1,
      name :'Red Rooster Restaurant',
      image: 'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg',
      address: 'ул. Цар Калоян 1А',
      rating: '4/5',
      ratingStats: {
        food: '5/5',
        place: '3/5',
        staff: '5/5'
      }
    },
    {
      id: 2,
      name :'Happy bar and grill',
      image: 'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg',
      address: 'ул. Цар Калоян 1А',
      rating: '4/5',
      ratingStats: {
        food: '5/5',
        place: '3/5',
        staff: '5/5'
      }
    }
  ];

  public ngOnInit(): void {
    //TODO uncommnent when we have the correct request
    //this.getAllRestaurants();
  }


  /**
   * Navigate to the page with restaurant information
   * @param restaurant
   */
  public navigateToRestaurant(restaurant: any) {
    let restaurantId = restaurant.id;
    if(restaurantId) {
      this.router.navigate([`restaurant-information/${restaurantId}`]);
    }
  }


  /**
   * Get all restaurants
   */
  public getAllRestaurants(): void {
    this.restaurantListingService.getAllRestaurants().then((data) => {
      this.restaurantList = data.restaurantList;
    })
  }
}
