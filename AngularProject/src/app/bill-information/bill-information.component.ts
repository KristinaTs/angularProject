import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {
  Router,
  ActivatedRoute
} from '@angular/router';

import {RestaurantListingService} from '../services/restaurant-listing.service';

@Component({
  templateUrl: 'bill-information.component.html'
})
export class BillInformationComponent implements OnInit {

  public routerSubscription: Subscription;
  public billId;
  public myBill: string = '24,5лв';
  public totalBill: string = '145лв';
  public isPayMode: boolean = false;
  public isEditMode: boolean = false;
  public restaurant = {
    id: 1,
    name: 'Red Rooster Restaurant',
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

  constructor(
    private router: Router,
    private restaurantService: RestaurantListingService,
    private activateRouter: ActivatedRoute,
  ) {}


  public billList: Array<any> = [
    {
      productName: 'Бахур1',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур2',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур3',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур4',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур5',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур6',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур7',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур8',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур9',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур10',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур11',
      quantity: 3,
      pricePerPiece: 2.5
    }
  ];

  public ngOnInit(): void {
    this.routerSubscription = this.activateRouter.params.subscribe(params => {
      const currentBillId = params['id'];
      this.billId = currentBillId;
      if (currentBillId) {
        this.getBillInformation(currentBillId);
      }
    });
  }

  /*
  Get bill information
   */
  public getBillInformation(currentId): void {
      this.restaurantService.getBillInformation(currentId).then((data) => {
          console.log(data);
      });
  }


  /***
   * Change pay mode to true so we can show the payment buttons
   */
  public goToPayScreen(): void {
      this.isPayMode = true;
  }

  public removeEntry(index: number): void {
    this.billList.splice(index, 1);
  }

  public goToEditMode(): void {
    this.isEditMode = true;
  }
}
