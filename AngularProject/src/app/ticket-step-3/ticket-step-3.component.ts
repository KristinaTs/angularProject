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
    templateUrl: 'ticket-step-3.component.html',
    host: {style: 'position: relative;'}
})
export class TicketStep3Component implements OnInit {

    public routerSubscription: Subscription;
    public billId;
    public myBill: string = '';
    public isPayMode: boolean = false;
    public data;
    public currentUser;
    public billInformation;
    public billSummary;
    public isInfoModalOpened = false;
    public subticketId;
    public title;
    public isSelectEnabled: boolean = false;
    public isShareEnabled: boolean = false;
    public isExpandEnabled: boolean = false;
    public isDistributionSet: boolean = false;
    public isModalOpened: boolean = false;
    public totalBill = "0 лв";

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
        private webSocketService: WebSocketService) {
    }


    /**
     * List with all data for the table
     * @type {any[]}
     */
    public billList: Array<any> = [];

    public ngOnInit(): void {
        this.routerSubscription = this.activateRouter.params.subscribe(params => {
            this.billId = params['billId'];
            this.subticketId = params['subticketId'];
            if (this.subticketId) {
                this.getBillInformation(this.subticketId);
                this.getGeneralInformationForBill();
                this.getBillSubtickets();
                this.webSocketService.connect(this.subticketId);
            }
        });

        this.webSocketService.onMessageEmitter.subscribe((data) => {
            console.log(data)
            switch (data) {
                case 'TICKET_UPDATED':
                    this.getBillInformation(this.subticketId);
                    this.getGeneralInformationForBill();
            }
        });
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

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.billInformationService.getStep3Information(this.billId, currentId).then((data) => {
            this.data = data;
            this.billList = data.ticketItems;
            this.billInformation = data.payableData;
            this.title = data.title;
            this.isSelectEnabled = this.billInformation.isSelectEnabled;
            this.isShareEnabled = this.billInformation.isShareEnabled;
            this.isExpandEnabled = this.billInformation.isExpandEnabled;
            this.isDistributionSet = this.billInformation.isDistributionSet;
            this.totalBill = this.billInformation.price / 100 + " лв";
            console.log('billInfo', data);

        });
        let data = {
            "id": 1,
            "title": "Група 1",
            "description": "",
            "payableData": {
                "price": 6132,
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
                                "totalParts": 3,
                                "shares": [
                                    {
                                        "number": 0,
                                        "price": 0,
                                        "isCurrent": false
                                    },
                                    {
                                        "number": 1,
                                        "price": 2044,
                                        "isCurrent": true
                                    },
                                    {
                                        "number": 2,
                                        "price": 4088,
                                        "isCurrent": false
                                    },
                                    {
                                        "number": 3,
                                        "price": 6132,
                                        "isCurrent": false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            "ticketItemRaws": [
                {
                    "title": "ГРЪЦКА САЛАТА",
                    "quantity": 2,
                    "price": 629,
                    "totalPrice": 1258
                },
                {
                    "title": "САЛАТА МИКОНОС",
                    "quantity": 1,
                    "price": 869,
                    "totalPrice": 869
                },
                {
                    "title": "САЛАТА РАЗКОШ",
                    "quantity": 1,
                    "price": 849,
                    "totalPrice": 849
                },
                {
                    "title": "САЛАТА С КИНОА И БЯЛА РИБА",
                    "quantity": 1,
                    "price": 849,
                    "totalPrice": 849
                },
                {
                    "title": "СПАНАК С КИНОА",
                    "quantity": 3,
                    "price": 769,
                    "totalPrice": 2307
                }
            ]
        }
        //
        // this.data = data;
        // this.billList = data.ticketItemRaws;
        // this.billInformation = data.payableData;
        // this.title = data.title;
        // this.isSelectEnabled = this.billInformation.isSelectEnabled;
        // this.isShareEnabled = this.billInformation.isShareEnabled;
        // this.isExpandEnabled = this.billInformation.isExpandEnabled;
        // this.isDistributionSet = this.billInformation.isDistributionSet;
        // this.totalBill = this.billInformation.price / 100 + " лв";
    }

    public getBillSubtickets() {
        this.billInformationService.getBillSubtickets(this.billId).then((data) => {
            // for (let i = 0; i < data.subTickets.length; i++) {
            //     this.billList = data;
            // }
            console.log('billInfo', data);
        });
    }

    public close() {
        this.isModalOpened = false;
    }

    /**
     * Request for general information about bill
     * {id, password, participants}
     */
    public getGeneralInformationForBill(): void {
        this.billInformationService.getBillSummary(this.billId).then((data) => {
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
        // this.getCurrentLoggedCustomer();
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
        //     "firstName": "Aleksandar",
        //     "lastName": "Avramov",
        //     "email": "avramov@abv.bg",
        //     "gender": "MALE"
        // };
        // this.getCurrentUserTotalBill();
    }

    /**
     * init subticket
     * @param id
     */
    public initSubticketPerItem(id) {
        let objectToSend = {
            distributionId: 1,
            myParts: 1
        }
        this.billInformationService.initSubticketPerGroup(this.billId, id, objectToSend).then((data) => {
            console.log(data);
        })
    }


    /***
     * Change pay mode to true so we can show the payment buttons
     */
    public goToPayScreen(): void {
        this.router.navigate([`/my-bill/${this.billId}`]);
    }

    /**
     * Show.hide modal
     */
    public openInfoPopup() {
        this.isInfoModalOpened = !this.isInfoModalOpened;
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
}
