import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {ActivatedRoute, Router} from '@angular/router';


import { RestaurantListingService } from '../services/restaurant-listing.service';
import { WebSocketService } from '../services/websocket.service';


@Component({
  templateUrl: 'restaurant-information.component.html'
})
export class RestaurantInformationComponent implements OnInit, OnDestroy {
  public routerSubscription: Subscription;
  public isRequestSendForBill = false;
  public restaurantId: number;
  public billCode = 'PIN';
  constructor (
    private router: Router,
    private restaurantService: RestaurantListingService,
    private activateRouter: ActivatedRoute,
    private webSocketService: WebSocketService
  ) {
    // let event = webSocketService.connect();
    // webSocketService.onMessageEmitter.subscribe((data) => {
    //   console.log(data);
    // });
  }

  public greeting = {
    welcome: 'Добре дошли!',
    description: 'Място за послание или топ промоция от ресторанта!'
  }

 restaurant =  { id:1,
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
   };


  public ngOnInit(): void {
    // here we get the information for the restaurant
    this.routerSubscription = this.activateRouter.params.subscribe(params => {
      const currentRestaurantId = params['id'];
      this.restaurantId = currentRestaurantId;
      if (currentRestaurantId) {
        this.getRestaurantInformation(currentRestaurantId);
      }
    });
  }

  /**
   * Unsubscribe from the router params when the component is destroyed
   */
  public ngOnDestroy(): void {
    if (this.routerSubscription) {
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
      console.log(response);
          this.restaurant = response;
      }).catch((err) => {
          console.error(err);
      });
  }

  public sendRequestForBill() {
    // send request for bill
    this.isRequestSendForBill = true;
    this.restaurantService.createNewBill(this.restaurantId)
      .then((data) => {
        console.log(data);
        this.billCode = data.id;
      })
      .catch(err => {
        console.error(err);
      });
  }

  public goToBillInformation() {
    this.router.navigate([`bill-information/${this.billCode}`]);
  }

}
