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
import {WebSocketService} from "../services/websocket.service";

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
        private activateRouter: ActivatedRoute,
        private webSocketService: WebSocketService
    ) {
        this.webSocketService.onMessageEmitter.subscribe((data) => {
            console.log(data)
            switch(data){
                case 'TICKET_UPDATED':
                    this.getBillInformation(this.currentBillId);
                    this.getGeneralInformationForBill();
            }
        });
    }

    /**
     * On init we get the id of the current bill from the URL
     */
    public ngOnInit(): void {
        this.routerSubscription = this.activateRouter.params.subscribe(params => {
            const currentBillId = params['id'];
            this.currentBillId = currentBillId;
            if (currentBillId) {
                this.webSocketService.connect(this.currentBillId);
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
           // this.currentUser = data;
            //this.getCurrentUserTotalBill();
        });
        //TODO delete
        this.currentUser = {
            "id": 1,
            "firstName": "Aleksandar",
            "lastName": "Avramov",
            "email": "avramov@abv.bg",
            "gender": "MALE"
        };
    }

    /**
     * Request for general information about bill
     * {id, password, participants}
     */
    public getGeneralInformationForBill(): void {
        this.billInformationService.getBillSummary(this.currentBillId).then((data) => {
            //this.billSummary = data;
            //this.getCurrentLoggedCustomer();
        });

        this.billSummary = {
            "id": 1,
            "password": "1293",
            "participants": [
                {
                    "shortName": "GV",
                    "fullName": "Georgi Vladimirov",
                    "isMe": true,
                    "totalPrice": 0,
                    id:1
                },
                {
                    "shortName": "AA",
                    "fullName": "Aleksandar Avramov",
                    "isMe": false,
                    "totalPrice": 0,
                    id:2
                }
            ]
        }
    }

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.billInformationService.getCurrentUserBill(currentId).then((data) => {
           // this.billList = data;
            // if(this.billInformation.price > 0) {
            //     this.totalBill = (this.billInformation.price/100) + ' лв'
            // } else {
            //     this.totalBill = '0 лв';
            // }
            console.log('billInfo', data);
        });
        let data = [
            {
                "id": 1,
                "title": "Група 1",
                "description": "",
                "payableData": {
                    "price": 1438,
                    "isSelectEnabled": false,
                    "isShareEnabled": true,
                    "isExpandEnabled": true,
                    "isDistributionSet": true,
                    "participantDatas": [
                        {
                            "id": 3,
                            "shortName": "AA",
                            "fullName": "Aleksandar Avramov",
                            "isMe": true,
                            "isIn": true,
                            "distributions": [
                                {
                                    "isSelectable": false,
                                    "totalParts": 3,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 1,
                                            "price": 480,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 2,
                                            "price": 959,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 1438,
                                            "isCurrent": false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": 3,
                "title": "СПАНАК С КИНОА",
                "description": "1 x 769",
                "payableData": {
                    "price": 769,
                    "isSelectEnabled": false,
                    "isShareEnabled": true,
                    "isExpandEnabled": false,
                    "isDistributionSet": true,
                    "participantDatas": [
                        {
                            "id": 3,
                            "shortName": "AA",
                            "fullName": "Aleksandar Avramov",
                            "isMe": true,
                            "isIn": true,
                            "distributions": [
                                {
                                    "isSelectable": false,
                                    "totalParts": 4,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 1,
                                            "price": 193,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 2,
                                            "price": 385,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 577,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 769,
                                            "isCurrent": false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ];

        this.billList = data;
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
     * Navigate to step 3 if the option is enabled
     * @param item
     */
    public navigateToStep3(item) {
       // if (item.payableData.isExpandEnabled) {
            this.router.navigate([`./ticket-step-3/${this.currentBillId}/${item.id}`]);
        //}
    }

    /**
     * Delete enrty
     * @param {number} index
     */
    public removeEntry(index: number): void {
        this.billInformationService.updateSubticket(this.currentBillId, this.billList[index].id, {myParts: 0}).then(() =>{

        }).catch(err => {
            console.error(err);
        });
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

    public navigateToPayWithCard() {
        this.router.navigate(['/pay-with-card']);
    }
}
