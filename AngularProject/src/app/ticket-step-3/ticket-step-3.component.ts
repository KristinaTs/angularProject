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

@Component({
    templateUrl: 'ticket-step-3.component.html',
    host: {style: 'position: relative;'}
})
export class TicketStep3Component implements OnInit {

    public routerSubscription: Subscription;
    public billId;
    public myBill: string = '24,5лв';
    public isPayMode: boolean = false;
    public isModalOpened: boolean = false;
    public data;
    public currentUser;
    public billInformation;
    public billSummary;

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
                private activateRouter: ActivatedRoute,) {
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
                this.getBillInformation(currentBillId);
            }
        });

        this.getCurrentLoggedCustomer();
        this.getGeneralInformationForBill();
        this.getBillSubtickets();
    }

    public openBillInfoModal() {
        this.isModalOpened = !this.isModalOpened;
    }

    /**
     Get bill information/ products in bill/ shares
     */
    public getBillInformation(currentId): void {
        this.restaurantService.getBillInformation(currentId).then((data) => {
            // for (let i = 0; i < data.subTickets.length; i++) {
            //     this.billList = this.billList.concat(data.subTickets[i].orderedItems);
            // }
            console.log('billInfo', data);
        });
        this.data = {
            "id": 1,
            "ticketItems": [{
                "id": 2,
                "title": "Група 1",
                "description": "",
                "payableData": {
                    "price": 2646,
                    "isSelectEnabled": false,
                    "isShareEnabled": true,
                    "isExpandEnabled": true,
                    "isDistributionSet": true,
                    "distributions": [{"totalParts": 1, "values": [2646]}, {
                        "totalParts": 2,
                        "values": [1323, 1323]
                    }, {"totalParts": 3, "values": [882, 882, 882]}, {
                        "totalParts": 4,
                        "values": [662, 662, 661, 661]
                    }, {"totalParts": 5, "values": [530, 529, 529, 529, 529]}, {
                        "totalParts": 6,
                        "values": [441, 441, 441, 441, 441, 441]
                    }, {"totalParts": 7, "values": [378, 378, 378, 378, 378, 378, 378]}, {
                        "totalParts": 8,
                        "values": [331, 331, 331, 331, 331, 331, 330, 330]
                    }, {"totalParts": 9, "values": [294, 294, 294, 294, 294, 294, 294, 294, 294]}, {
                        "totalParts": 10,
                        "values": [265, 265, 265, 265, 265, 265, 264, 264, 264, 264]
                    }],
                    "selectedDistributionId": 3,
                    "freeIds": [2],
                    "shares": [{"id": 2, "firstName": "Georgi", "lastName": "Vladimirov", "takenIds": [1]}, {
                        "id": 3,
                        "firstName": "Aleksandar",
                        "lastName": "Avramov",
                        "takenIds": [0]
                    }]
                }
            }, {
                "id": 4,
                "title": "КЪСЧЕТА С ТОПЕНО СИРЕНЕ",
                "description": "1 x 949",
                "payableData": {
                    "price": 949,
                    "isSelectEnabled": true,
                    "isShareEnabled": true,
                    "isExpandEnabled": false,
                    "isDistributionSet": false,
                    "distributions": [{"totalParts": 1, "values": [949]}, {
                        "totalParts": 2,
                        "values": [475, 474]
                    }, {"totalParts": 3, "values": [317, 316, 316]}, {
                        "totalParts": 4,
                        "values": [238, 237, 237, 237]
                    }, {"totalParts": 5, "values": [190, 190, 190, 190, 189]}, {
                        "totalParts": 6,
                        "values": [159, 158, 158, 158, 158, 158]
                    }, {"totalParts": 7, "values": [136, 136, 136, 136, 135, 135, 135]}, {
                        "totalParts": 8,
                        "values": [119, 119, 119, 119, 119, 118, 118, 118]
                    }, {"totalParts": 9, "values": [106, 106, 106, 106, 105, 105, 105, 105, 105]}, {
                        "totalParts": 10,
                        "values": [95, 95, 95, 95, 95, 95, 95, 95, 95, 94]
                    }],
                    "selectedDistributionId": 0,
                    "freeIds": [],
                    "shares": []
                }
            }],
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
        }
        this.billList = this.data.ticketItems;
        this.billInformation = this.data.ticketPayableData;
    }

    public getBillSubtickets() {
        // this.restaurantService.getBillSubtickets(this.billId).then((data) => {
        //     // for (let i = 0; i < data.subTickets.length; i++) {
        //     //     this.billList = data;
        //     // }
        //     console.log('billInfo', data);
        // });
    }

    /**
     * Request for general information about bill
     * {id, password, participants}
     */
    public getGeneralInformationForBill(): void {
        this.restaurantService.getBillSummary(this.billId).then((data) => {
            //this.billSummary = data;
        });

        this.billSummary = {
            "id": 1,
            "password": "8839",
            "participants": [
                {
                    "id": 2,
                    "firstName": "Georgi",
                    "lastName": "Vladimirov",
                    "totalPrice": 882
                },
                {
                    "id": 3,
                    "firstName": "Aleksandar",
                    "lastName": "Avramov",
                    "totalPrice": 882
                }
            ]
        };
    }

    /**
     * Group data by product name
     * @param data
     */
    public groupData(data): void {
        this.billList = [];
        let concatData = [];
        for (let i = 0; i < data.subTickets.length; i++) {
            concatData = concatData.concat(data.subTickets[i].orderedItems);
        }
        for (let index = 0; index < concatData.length; index++) {
            // check if we have the same element in the array
            let existingIndex = this.billList.map(element => {
                return element.menuItem.id;
            }).indexOf(concatData[index].menuItem.id);
            if (existingIndex >= 0) {
                this.billList[existingIndex].menuItem.count++;
            } else {
                let objectForList = concatData[index];
                objectForList.menuItem.count = 1;
                this.billList.push(objectForList);
            }
        }
    }

    /**
     * Get current logged in user
     */
    public getCurrentLoggedCustomer(): void {
        this.restaurantService.getCurrentUser().then((data) => {
            //this.currentUser = data;
        })
        //TODO delete
        this.currentUser = {
            "id": 3,
            "firstName": "Aleksandar",
            "lastName": "Avramov",
            "email": "avramov@abv.bg",
            "gender": "MALE"
        };
    }

    /**
     * init subticket
     * @param id
     */
    public initSubticketPerItem(id) {
        let objectToSend = {
            distributionId: 1,
            myParts:1
        }
        // this.restaurantService.initSubticketPerGroup(this.billId, id, objectToSend).then((data) => {
        //     console.log(data);
        // })
    }

    public openBillInformationPopup(index) {
        this.isModalOpened = true;
        this.billInformation = this.billList[index].payableData;
        console.log('tet');
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
        this.isPayMode = true;
    }
}
