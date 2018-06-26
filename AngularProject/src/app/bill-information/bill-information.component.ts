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
    templateUrl: 'bill-information.component.html',
    host: {style: 'position: relative;'}
})

export class BillInformationComponent implements OnInit {
    public routerSubscription: Subscription;
    public billId;
    public myBill: string = '0 лв';
    public totalBill: string = null;
    public isPayMode: boolean = false;
    public isEditMode: boolean = false;
    public isModalOpened: boolean = false;
    public isInfoModalOpened: boolean = false;
    public currentBillId = null;
    public currentUser = null;
    public billSummary = null;
    public billInformation = null;
    public isSelectEnabled: boolean = false;
    public isShareEnabled: boolean = false;
    public isExpandEnabled: boolean  = false;
    public isDistributionSet: boolean = false;

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
            this.billId = currentBillId;
            if (currentBillId) {
                this.getBillInformation(currentBillId);
            }
        });
        this.getGeneralInformationForBill();
        this.getCurrentLoggedCustomer();
        this.getCurrentUserTotalBill();

    }

    /**
     * Show.hide modal
     */
    public openBillInfoModal() {
        if(this.isShareEnabled) {
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
           //this.currentUser = data;
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
            //this.getCurrentUserTotalBill();
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

    public close() {
        this.isModalOpened = false;
            this.getBillInformation(this.currentBillId);


    this.getCurrentLoggedCustomer();
    this.getGeneralInformationForBill();
    this.getCurrentUserTotalBill();
    }

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.billInformationService.getBillInformation(currentId).then((data) => {
            // this.billList = data.ticketItems;
            // this.billInformation = data.ticketPayableData;
            // if(this.billInformation.price > 0) {
            //     this.totalBill = (this.billInformation.price/100) + ' лв'
            // } else {
            //     this.totalBill = '0 лв';
            // }
            // this.isSelectEnabled = this.billInformation.isSelectEnabled;
            // this.isShareEnabled = this.billInformation.isShareEnabled;
            // this.isExpandEnabled = this.billInformation.isExpandEnabled;
            // this.isDistributionSet = this.billInformation.isDistributionSet;
            console.log('billInfo', data);
        });
        let data = {
            "id": 1,
            "ticketItems": [
                {
                    "title": "ПИЛЕШКИ ПУРИЧКИ С ТОПЕНО СИРЕНЕ И ПЪРЖЕНИ КАРТОФИ",
                    "quantity": 1,
                    "price": 878,
                    "totalPrice": 878
                },
                {
                    "title": "КРЕХКО ПИЛЕ С ПЕЧЕНИ ЗЕЛЕНЧУЦИ",
                    "quantity": 1,
                    "price": 899,
                    "totalPrice": 899
                },
                {
                    "title": "ЦЕЗАР САЛАТА",
                    "quantity": 1,
                    "price": 869,
                    "totalPrice": 869
                }
            ],
            "ticketPayableData":
                {
                    "price": 2646,
                    "isSelectEnabled": false,
                    "isShareEnabled": true,
                    "isExpandEnabled": false,
                    "isDistributionSet": true,
                    "distributions": [
                        {
                            "totalParts": 1,
                            "values": [2646]
                        },
                        {
                            "totalParts": 2,
                            "values": [1323, 1323]
                        },
                        {
                            "totalParts": 3,
                            "values": [882, 882, 882]
                        },
                        {
                            "totalParts": 4,
                            "values": [662, 662, 661, 661]
                        },
                        {
                            "totalParts": 5,
                            "values": [530, 529, 529, 529, 529]
                        },
                        {
                            "totalParts": 6,
                            "values": [441, 441, 441, 441, 441, 441]
                        },
                        {
                            "totalParts": 7,
                            "values": [378, 378, 378, 378, 378, 378, 378]
                        },
                        {
                            "totalParts": 8,
                            "values": [331, 331, 331, 331, 331, 331, 330, 330]
                        },
                        {
                            "totalParts": 9,
                            "values": [294, 294, 294, 294, 294, 294, 294, 294, 294]
                        },
                        {
                            "totalParts": 10,
                            "values": [265, 265, 265, 265, 265, 265, 264, 264, 264, 264]
                        }
                    ],
                    "selectedDistributionId": 3,
                    "freeIds": [2],
                    "shares": [
                        {
                            "id": 2,
                            "firstName": "Georgi",
                            "lastName": "Vladimirov",
                            "takenIds": [1]
                        },
                        {
                            "id": 3,
                            "firstName": "Aleksandar",
                            "lastName": "Avramov",
                            "takenIds": [0]
                        }]
                }
        };

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
        console.log('billInfo', data);

        //this.groupData(data);
    }

    /**
     * Create array with separated elements
     * @param index
     */
    public goToEditModePerItem(index): void {
        let item = this.billList[index];
        let newDataPerItem = [];
        let count = item.menuItem.count;
        item.menuItem.count = 1;
        for (let i = 0; i < count; i++) {
            newDataPerItem.push(item);
        }
        this.billList = newDataPerItem;
    }


    /***
     * Change pay mode to true so we can show the payment buttons
     */
    public goToPayScreen(): void {
        this.isPayMode = true;
    }

    /**
     * Delete enrty
     * @param {number} index
     */
    public removeEntry(index: number): void {
        this.billList.splice(index, 1);
    }

    /**
     * Navigate to step 2 on bill information
     */
    public navigateToSecondStepBill(): void {
        if (this.isExpandEnabled) {
            this.isEditMode = true;
            if (this.currentBillId) {
                this.navigateToTicketStep2(this.currentBillId);
            } else {
                //TODO delete
                this.navigateToTicketStep2(this.billId);
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
                totalParts: 1,
                myParts: 1
            };
            this.billInformationService.initNewTicket(this.billId, objectToSend).then((data) => {
                //TODO
                console.log('SUCCESS')
            })
        } else {
            //TODO
            console.error('Cannot send init!')
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
        if ( price && price > 0) {
            this.myBill = (price / 100) + ' лв';
        } else {
            this.myBill = '0 лв';
        }

    }
}
