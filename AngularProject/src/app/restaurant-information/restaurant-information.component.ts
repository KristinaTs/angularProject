import {
  Component, OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from "rxjs/Subscription";
import {ActivatedRoute, Router} from "@angular/router";


import {RestaurantListingService} from "../services/restaurant-listing.service";


@Component({
  templateUrl: 'restaurant-information.component.html'
})
export class RestaurantInformationComponent implements OnInit, OnDestroy {
  public routerSubscription: Subscription;
  public isRequestSendForBill: boolean = false;
  public billCode: string = 'PIN';
  constructor (
    private router: Router,
    private restaurantService: RestaurantListingService,
    private activateRouter: ActivatedRoute
  ){}

   public restaurant =  {
      id: 1,
      name :'Red Rooster Restaurant',
      image: 'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg',
      address: 'ул. Цар Калоян 1А',
      rating: '4/5',
      ratingStats: {
        food: '5/5',
        place: '3/5',
        staff: '5/5'
      },
     welcome: 'Добре дошли!',
     description: 'Място за послание или топ промоция от ресторанта!'
    };


  public ngOnInit(): void {
    // here we get the information for the restaurant
    //TODO uncomment when we have a correct request
    this.routerSubscription = this.activateRouter.params.subscribe(params => {
      let currentRestaurantId = params['id'];
      if(currentRestaurantId) {
       // this.getRestaurantInformation(currentRestaurantId);
      }
    });
  }

  /**
   * Unsubscribe from the router params when the component is destroyed
   */
  public ngOnDestroy(): void {
    if(this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  /**
   * Get all the information for the restaurant with the given id
   * @param restaurantId
   */
  public getRestaurantInformation(restaurantId: any) {
    this.restaurantService.getRestaurantInformation(restaurantId)
      .then((response) => {
          this.restaurant = response.restaurant;
      }).catch((err) =>{
          console.error(err);
      });
  }

  public sendRequestForBill() {
    // send request for bill
    this.isRequestSendForBill = true;
  }

  public goToBillInformation() {
    this.router.navigate([`bill-information/${this.billCode}`]);
  }

}
