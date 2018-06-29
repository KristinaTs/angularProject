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
    templateUrl: 'ticket-step-2.component.html',
    host: {style: 'position: relative;'}
})
export class TicketStep2Component implements OnInit {

    public routerSubscription: Subscription;
    public billId;
    public myBill: string = '24,5лв';
    public isModalOpened: boolean = false;
    public data;
    public currentUser;
    public billSummary;
    public subticketId;
    public isInfoModalOpened = false;
    public payableData;
    public title = "";

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

    constructor(private router: Router,
                private restaurantService: RestaurantListingService,
                private billInformationService: BillInformationService,
                private activateRouter: ActivatedRoute) {
    }


    /**
     * List with all data for the table
     * @type {any[]}
     */
    public billList: Array<any> = [];

    public ngOnInit(): void {
        this.routerSubscription = this.activateRouter.params.subscribe(params => {
            const currentBillId = params['id'];
            this.billId = currentBillId;
            if (currentBillId) {
                this.getBillSubtickets();
                //this.getBillInformation(currentBillId);
            }
        });

        this.getCurrentLoggedCustomer();
        this.getGeneralInformationForBill();
    }

    public openBillInfoModal() {
        this.isModalOpened = !this.isModalOpened;
    }

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.billInformationService.getBillInformation(currentId).then((data) => {
           // this.billList = data.ticketItems;
            console.log('billInfo', data);
        });
        this.billList = [
            {
                "id": 1,
                "title": "Група1",
                "description": "",
                "payableData": {
                    "price": 10357,
                    "isSelectEnabled": false,
                    "isShareEnabled": true,
                    "isExpandEnabled": true,
                    "participantDatas": [
                        {
                            "id": 2,
                            "shortName": "GV",
                            "fullName": "GeorgiVladimirov",
                            "isMe": true,
                            "isIn": false,
                            "distributions": [
                                {
                                    "isSelectable": false,
                                    "totalParts": 3,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 3452,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 6904,
                                            "isCurrent": false
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "id": 3,
                            "shortName": "AA",
                            "fullName": "AleksandarAvramov",
                            "isMe": false,
                            "isIn": true,
                            "distributions": [
                                {
                                    "isSelectable": false,
                                    "totalParts": 3,
                                    "shares": [
                                        {
                                            "number": 1,
                                            "price": 3453,
                                            "isCurrent": true
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            },
            {
                "id": 14,
                "title": "УАКАМЕ",
                "description": "1x699",
                "payableData": {
                    "price": 699,
                    "isSelectEnabled": true,
                    "isShareEnabled": true,
                    "isExpandEnabled": false,
                    "participantDatas": [
                        {
                            "id": 2,
                            "shortName": "GV",
                            "fullName": "GeorgiVladimirov",
                            "isMe": true,
                            "isIn": false,
                            "distributions": [
                                {
                                    "isSelectable": true,
                                    "totalParts": 1,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 2,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 350,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 3,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 233,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 466,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 4,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 175,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 350,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 525,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 5,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 140,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 280,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 420,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 560,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 5,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 6,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 117,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 234,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 351,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 467,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 5,
                                            "price": 583,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 6,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 7,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 100,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 200,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 300,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 400,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 5,
                                            "price": 500,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 6,
                                            "price": 600,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 7,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 8,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 88,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 176,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 264,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 351,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 5,
                                            "price": 438,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 6,
                                            "price": 525,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 7,
                                            "price": 612,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 8,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 9,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 78,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 156,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 234,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 312,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 5,
                                            "price": 390,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 6,
                                            "price": 468,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 7,
                                            "price": 545,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 8,
                                            "price": 622,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 9,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                },
                                {
                                    "isSelectable": true,
                                    "totalParts": 10,
                                    "shares": [
                                        {
                                            "number": 0,
                                            "price": 0,
                                            "isCurrent": true
                                        },
                                        {
                                            "number": 1,
                                            "price": 70,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 2,
                                            "price": 140,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 3,
                                            "price": 210,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 4,
                                            "price": 280,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 5,
                                            "price": 350,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 6,
                                            "price": 420,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 7,
                                            "price": 490,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 8,
                                            "price": 560,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 9,
                                            "price": 630,
                                            "isCurrent": false
                                        },
                                        {
                                            "number": 10,
                                            "price": 699,
                                            "isCurrent": false
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ]
    }

    /**
     * Show.hide modal
     */
    public openInfoPopup() {
        this.isInfoModalOpened = !this.isInfoModalOpened;
    }

    /**
     * Get curretn bill subtickets
     */
    public getBillSubtickets() {
        this.billInformationService.getBillSubtickets(this.billId).then((data) => {
            this.billList = data;
        });
    }

    /**
     * Request for general information about bill
     * {id, password, participants}
     */
    public getGeneralInformationForBill(): void {
        this.billInformationService.getBillSummary(this.billId).then((data) => {
           this.billSummary = data;
        });

        // this.billSummary = {
        //     "id": 1,
        //     "password": "8839",
        //     "participants": [
        //         {
        //             "id": 2,
        //             "firstName": "Georgi",
        //             "lastName": "Vladimirov",
        //             "totalPrice": 882
        //         },
        //         {
        //             "id": 3,
        //             "firstName": "Aleksandar",
        //             "lastName": "Avramov",
        //             "totalPrice": 882
        //         }
        //     ]
        // };
    }

    /**
     * Get current logged in user
     */
    public getCurrentLoggedCustomer(): void {
        this.restaurantService.getCurrentUser().then((data) => {
            this.currentUser = data;
        });
        //TODO delete
        // this.currentUser = {
        //     "id": 3,
        //     "firstName": "Aleksandar",
        //     "lastName": "Avramov",
        //     "email": "avramov@abv.bg",
        //     "gender": "MALE"
        // };
    }

    /**
     * init subticket
     * @param id
     */
    public initSubticketPerItem(id) {
        let objectToSend = {
            distributionId: 1,
            myParts:1
        };
        this.billInformationService.initSubticketPerGroup(this.billId, id, objectToSend).then((data) => {
            console.log(data);
        })
    }

    /**
     * Open bill information popup
     * @param index
     */
    public openBillInformationPopup(index) {
        this.subticketId = this.billList[index].id;
        this.payableData = this.billList[index].payableData;
        this.title = this.billList[index].title;
        this.isModalOpened = true;
    }

    /**
     * Create array with separated elements
     * @param index
     */
    public goToEditModePerItem(id): void {
        this.router.navigate([`./ticket-step-3/${id}`])
    }

    /***
     * Change pay mode to true so we can show the payment buttons
     */
    public goToPayScreen(): void {
        this.router.navigate([`/my-bill/${this.billId}`]);
    }
}
