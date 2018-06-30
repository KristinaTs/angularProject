import {
    Component,
    OnInit
} from '@angular/core';

import {Subscription} from 'rxjs/Subscription';

import {
    Router,
    ActivatedRoute
} from '@angular/router';

import {RestaurantListingService} from '../services/restaurant-listing.service';
import {BillInformationService} from "../services/bill-information.service";

@Component({
    templateUrl: 'my-bill.component.html',
    host: {style: 'position: relative;'}
})

export class MyBillComponent implements OnInit {
    public routerSubscription: Subscription;
    public myBill: string = '0 лв';
    public totalBill: string = null;
    public isInfoModalOpened: boolean = false;
    public currentBillId = null;
    public currentUser = null;
    public billSummary = null;

    /**
     * List with all data for the table
     * @type {any[]}
     */
    public billList: Array<any> = [];

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
        private billInformationService: BillInformationService,
        private activateRouter: ActivatedRoute
    ) {}

    /**
     * On init we get the id of the current bill from the URL
     */
    public ngOnInit(): void {
        this.routerSubscription = this.activateRouter.params.subscribe(params => {
            const currentBillId = params['id'];
            this.currentBillId = currentBillId;
            if (currentBillId) {
                this.getBillInformation(currentBillId);
                this.getGeneralInformationForBill();
            }
        });
    }

    /**
     * Show.hide modal
     */
    public openInfoPopup() {
        this.isInfoModalOpened = !this.isInfoModalOpened;
    }

    /**
     * Get current logged in user
     */
    public getCurrentLoggedCustomer(): void {
        this.restaurantService.getCurrentUser().then((data) => {
            this.currentUser = data;
            this.getCurrentUserTotalBill();
        });
        //TODO delete
        // this.currentUser = {
        //     "id": 1,
        //     "firstName": "Aleksandar",
        //     "lastName": "Avramov",
        //     "email": "avramov@abv.bg",
        //     "gender": "MALE"
        // };
    }

    /**
     * Request for general information about bill
     * {id, password, participants}
     */
    public getGeneralInformationForBill(): void {
        this.billInformationService.getBillSummary(this.currentBillId).then((data) => {
            this.billSummary = data;
            this.getCurrentLoggedCustomer();
        });

        // this.billSummary = {
        //     "id": 1,
        //     "password": "1293",
        //     "participants": [
        //         {
        //             "shortName": "GV",
        //             "fullName": "Georgi Vladimirov",
        //             "isMe": true,
        //             "totalPrice": 0,
        //             id:1
        //         },
        //         {
        //             "shortName": "AA",
        //             "fullName": "Aleksandar Avramov",
        //             "isMe": false,
        //             "totalPrice": 0,
        //             id:2
        //         }
        //     ]
        // }
    }

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.billInformationService.getCurrentUserBill(currentId).then((data) => {
            this.billList = data;
            // if(this.billInformation.price > 0) {
            //     this.totalBill = (this.billInformation.price/100) + ' лв'
            // } else {
            //     this.totalBill = '0 лв';
            // }
            console.log('billInfo', data);
        });
        // let data = {
        //     "id": 1,
        //     "ticketItems": [
        //         {
        //             "title": "ПИЛЕШКИ ПУРИЧКИ С ТОПЕНО СИРЕНЕ И ПЪРЖЕНИ КАРТОФИ",
        //             "quantity": 1,
        //             "price": 878,
        //             "totalPrice": 878
        //         },
        //         {
        //             "title": "КРЕХКО ПИЛЕ С ПЕЧЕНИ ЗЕЛЕНЧУЦИ",
        //             "quantity": 1,
        //             "price": 899,
        //             "totalPrice": 899
        //         },
        //         {
        //             "title": "ЦЕЗАР САЛАТА",
        //             "quantity": 1,
        //             "price": 869,
        //             "totalPrice": 869
        //         }
        //     ]
        // };

        //this.billList = data.ticketItems;
      //  console.log('billInfo', data);

        //this.groupData(data);
    }

    public calculatePrice(item) {
        let price;
        let shares = item.payableData.participantDatas[0].distributions[0].shares;
        shares.forEach(share => {
            if(share.isCurrent) {
                price = (share.price / 100);
                return price;
            }
        });
    }

    /**
     * Delete enrty
     * @param {number} index
     */
    public removeEntry(index: number): void {
        this.billList.splice(index, 1);
    }

    /**
     * Find current user in participants array and get total price
     */
    public getCurrentUserTotalBill(): void {
        let participants = this.billSummary.participants;
        let indexOfCurrectUser = participants.map((user) => {
            return user.id;
        }).indexOf(this.currentUser.id);
        let price = participants[indexOfCurrectUser].totalPrice;
        if ( price && price > 0) {
            this.myBill = (price / 100) + ' лв';
        } else {
            this.myBill = '0 лв';
        }
    }
}
