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
import {SharedCommunicationService} from "../services/shared-communication.service";
import {BillInformationService} from "../services/bill-information.service";
import {WebSocketService} from "../services/websocket.service";

@Component({
    templateUrl: 'bill-information.component.html',
    host: {style: 'position: relative;'}
})

export class BillInformationComponent implements OnInit {
    public routerSubscription: Subscription;
    public myBill: string = '0 лв';
    public totalBill: string = null;
    public isModalOpened: boolean = false;
    public isInfoModalOpened: boolean = false;
    public currentBillId = null;
    public currentUser = null;
    public billSummary = null;
    public billInformation = null;
    public isSelectEnabled: boolean = false;
    public isShareEnabled: boolean = false;
    public isExpandEnabled: boolean = false;
    public isDistributionSet: boolean = false;


    public data = {
        "id": 1,
        "ticketItems": [
            {
                "title": "САЛАТАМИКОНОС",
                "quantity": 1,
                "price": 869,
                "totalPrice": 869
            },
            {
                "title": "САЛАТАРАЗКОШ",
                "quantity": 1,
                "price": 849,
                "totalPrice": 849
            },
            {
                "title": "САЛАТАСЯГОДИ,СИРЕНАИЯДКИ",
                "quantity": 1,
                "price": 699,
                "totalPrice": 699
            },
            {
                "title": "САЛАТАХЕПИЦЕЗАР",
                "quantity": 2,
                "price": 899,
                "totalPrice": 1798
            },
            {
                "title": "СПАНАКСКИНОА",
                "quantity": 2,
                "price": 769,
                "totalPrice": 1538
            },
            {
                "title": "СРЕДИЗЕМНОМОРСКАСАЛАТА",
                "quantity": 1,
                "price": 749,
                "totalPrice": 749
            },
            {
                "title": "ЦЕЗАРСАЛАТА",
                "quantity": 3,
                "price": 869,
                "totalPrice": 2607
            },
            {
                "title": "ШЕФСКАСАЛАТА",
                "quantity": 1,
                "price": 679,
                "totalPrice": 679
            },
            {
                "title": "ШОПСКАСАЛАТА",
                "quantity": 1,
                "price": 569,
                "totalPrice": 569
            }
        ],
        "ticketPayableData": {
            "price": 10357,
            "isSelectEnabled": true,
            "isShareEnabled": true,
            "isExpandEnabled": true,
            "participantDatas": [
                {
                    "id": 3,
                    "shortName": "AA",
                    "fullName": "AleksandarAvramov",
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
                                    "price": 10357,
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
                                    "price": 5179,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 10357,
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
                                    "price": 3453,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 6905,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 10357,
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
                                    "price": 2590,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 5179,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 7768,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 10357,
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
                                    "price": 2072,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 4144,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 6215,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 8286,
                                    "isCurrent": false
                                },
                                {
                                    "number": 5,
                                    "price": 10357,
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
                                    "price": 1727,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 3453,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 5179,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 6905,
                                    "isCurrent": false
                                },
                                {
                                    "number": 5,
                                    "price": 8631,
                                    "isCurrent": false
                                },
                                {
                                    "number": 6,
                                    "price": 10357,
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
                                    "price": 1480,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 2960,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 4440,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 5920,
                                    "isCurrent": false
                                },
                                {
                                    "number": 5,
                                    "price": 7399,
                                    "isCurrent": false
                                },
                                {
                                    "number": 6,
                                    "price": 8878,
                                    "isCurrent": false
                                },
                                {
                                    "number": 7,
                                    "price": 10357,
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
                                    "price": 1295,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 2590,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 3885,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 5180,
                                    "isCurrent": false
                                },
                                {
                                    "number": 5,
                                    "price": 6475,
                                    "isCurrent": false
                                },
                                {
                                    "number": 6,
                                    "price": 7769,
                                    "isCurrent": false
                                },
                                {
                                    "number": 7,
                                    "price": 9063,
                                    "isCurrent": false
                                },
                                {
                                    "number": 8,
                                    "price": 10357,
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
                                    "price": 1151,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 2302,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 3453,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 4604,
                                    "isCurrent": false
                                },
                                {
                                    "number": 5,
                                    "price": 5755,
                                    "isCurrent": false
                                },
                                {
                                    "number": 6,
                                    "price": 6906,
                                    "isCurrent": false
                                },
                                {
                                    "number": 7,
                                    "price": 8057,
                                    "isCurrent": false
                                },
                                {
                                    "number": 8,
                                    "price": 9207,
                                    "isCurrent": false
                                },
                                {
                                    "number": 9,
                                    "price": 10357,
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
                                    "price": 1036,
                                    "isCurrent": false
                                },
                                {
                                    "number": 2,
                                    "price": 2072,
                                    "isCurrent": false
                                },
                                {
                                    "number": 3,
                                    "price": 3108,
                                    "isCurrent": false
                                },
                                {
                                    "number": 4,
                                    "price": 4144,
                                    "isCurrent": false
                                },
                                {
                                    "number": 5,
                                    "price": 5180,
                                    "isCurrent": false
                                },
                                {
                                    "number": 6,
                                    "price": 6216,
                                    "isCurrent": false
                                },
                                {
                                    "number": 7,
                                    "price": 7252,
                                    "isCurrent": false
                                },
                                {
                                    "number": 8,
                                    "price": 8287,
                                    "isCurrent": false
                                },
                                {
                                    "number": 9,
                                    "price": 9322,
                                    "isCurrent": false
                                },
                                {
                                    "number": 10,
                                    "price": 10357,
                                    "isCurrent": false
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }

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
        private billInformationService: BillInformationService,
        private webSocketService: WebSocketService,
        private sharedCommunicationService: SharedCommunicationService
    ) {}


    /**
     * List with all data for the table
     * @type {any[]}
     */
    public billList: Array<any> = [];

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
                this.webSocketService.connect(currentBillId);
            }
        });
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
     * Show.hide modal
     */
    public openBillInfoModal() {
        if (this.isShareEnabled) {
            this.isModalOpened = !this.isModalOpened;
        }
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
        // //TODO delete
        // this.currentUser = {
        //     "id": 3,
        //     "shortName": "GV",
        //     "fullName": "GeorgiVladimirov",
        //     "isMe": true,
        //     "isIn": false
        // };
        // this.restaurantService.getCurrentUser().then((data) => {
        //    this.currentUser = data;
        // });
    }

    /**
     * Request for general information about bill
     * {id, password, participants}
     */
    public getGeneralInformationForBill(): void {
        this.billInformationService.getBillSummary(this.currentBillId).then((data) => {
            this.billSummary = data;
            this.getCurrentLoggedCustomer();
            this.getRestaurantInformation(data.posId);
        });
        // this.billSummary = {
        //     "id": 1,
        //     "password": "1293",
        //     "participants": [
        //         // {
        //         //     "shortName": "GV",
        //         //     "fullName": "Georgi Vladimirov",
        //         //     "isMe": true,
        //         //     "totalPrice": 0,
        //         //     id: 2
        //         // },
        //         {
        //             "shortName": "AA",
        //             "fullName": "Aleksandar Avramov",
        //             "isMe": false,
        //             "totalPrice": 0,
        //             id: 3
        //         }
        //     ]
        // }

        this.getCurrentLoggedCustomer();
        //this.getRestaurantInformation(data.posId);
    }

    public close() {
        this.isModalOpened = false;
       // this.getBillInformation(this.currentBillId);
        //this.getCurrentUserTotalBill();
    }

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.billInformationService.getBillInformation(currentId).then((data) => {
            this.billList = data.ticketItems;
            this.billInformation = data.ticketPayableData;
            if(this.billInformation.price > 0) {
                this.totalBill = (this.billInformation.price/100) + ' лв'
            } else {
                this.totalBill = '0 лв';
            }
            this.isSelectEnabled = this.billInformation.isSelectEnabled;
            this.isShareEnabled = this.billInformation.isShareEnabled;
            this.isExpandEnabled = this.billInformation.isExpandEnabled;
            this.isDistributionSet = this.billInformation.isDistributionSet;
        });
        //
        // this.billList = this.data.ticketItems;
        // this.billInformation = this.data.ticketPayableData;
        // if (this.billInformation.price > 0) {
        //     this.totalBill = (this.billInformation.price / 100) + ' лв'
        // } else {
        //     this.totalBill = '0 лв';
        // }
        // this.isSelectEnabled = this.billInformation.isSelectEnabled;
        // this.isShareEnabled = this.billInformation.isShareEnabled;
        // this.isExpandEnabled = this.billInformation.isExpandEnabled;
        // this.isDistributionSet = this.billInformation.isDistributionSet;

        // this.groupData(data);
    }

    /***
     * Change pay mode to true so we can show the payment buttons
     */
    public goToPayScreen(): void {
        this.router.navigate([`/my-bill/${this.currentBillId}`]);
    }

    /**
     * Navigate to step 2 on bill information
     */
    public navigateToSecondStepBill(): void {
        if (this.isExpandEnabled) {
            if (this.currentBillId) {
                this.navigateToTicketStep2(this.currentBillId);
            }
        } else {
            // console.error('Cannot expand bill!')
        }
    }

    /**
     * Navigate to the page with restaurant information
     * @param restaurant
     */
    public navigateToTicketStep2(ticketId: any) {
        //TODO
        this.router.navigate([`ticket-step-2/${ticketId}`]);
    }

    /**
     * Init new ticket, take the bill
     */
    public initTicket(): void {
        if (this.isSelectEnabled) {
            let objectToSend = {
                distributionId: 0,
                myParts: 1
            };
            this.billInformationService.initNewTicket(this.currentBillId, objectToSend).then((data) => {
                //TODO
                console.log('SUCCESS')
            }).catch(error => {
                //TODO
                console.error('FAIL')
            })
        } else {
            //TODO
            console.error('Cannot send init!')
        }
    }

    public goToPayWithCard(): void {
        this.sharedCommunicationService.setState({totalBill: this.totalBill});
        this.router.navigate(['/pay-with-card']);
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
        if (price && price > 0) {
            this.myBill = (price / 100) + ' лв';
        } else {
            this.myBill = '0 лв';
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
}
