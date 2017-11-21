import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from '@angular/router';
import {RestaurantListingService} from '../services/restaurant-listing.service';

@Component({
  templateUrl: 'bill-information.component.html'
})
export class BillInformationComponent {

  public billList: Array<any> = [
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    },
    {
      productName: 'Бахур',
      quantity: 3,
      pricePerPiece: 2.5
    }
  ];
  public myBill: string = '24,5лв';
  public totalBill: string = '145лв';
  public isPayMode: boolean = false;
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

  /***
   * Change pay mode to true so we can show the payment buttons
   */
  public goToPayScreen(): void {
      this.isPayMode = true;
  }
}
