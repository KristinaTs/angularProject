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
    templateUrl: 'ticket-step-2.component.html',
    host: {style: 'position: relative;'}
})
export class TicketStep2Component implements OnInit {

    public routerSubscription: Subscription;
    public billId;
    public myBill: string = '24,5лв';
    public totalBill: string = '145лв';
    public isPayMode: boolean = false;
    public isEditMode: boolean = true;
    public isModalOpened: boolean = false;

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
    }

    public openBillInfoModal() {
        this.isModalOpened = !this.isModalOpened;
    }

    /*
     Get bill information
     */
    public getBillInformation(currentId): void {
        // this.restaurantService.getBillInformation(currentId).then((data) => {
        //   for(let i = 0; i < data.subTickets.length; i++) {
        //     this.billList= this.billList.concat(data.subTickets[i].orderedItems);
        //   }
        //   console.log('billInfo',data);
        // });
        let data = {
            "id": 3,
            "posId": 1,
            "tableId": null,
            "password": "3076",
            "isConfirmed": true,
            "isActive": true,
            "subTickets": [{
                "id": 1,
                "totalParts": 1,
                "isPaid": false,
                "orderedItems": [{
                    "id": 6,
                    "menuItem": {
                        "id": 15,
                        "posId": "15",
                        "title": "CUPPOCINO",
                        "price": 200,
                        "category": "BEVERAGE & DRINKS",
                        "unit": "",
                        "quantity": 1,
                        "description": "HOT DRINKS"
                    }
                }],
                "shares": [],
                "price": 200
            }, {
                "id": 3,
                "totalParts": 1,
                "isPaid": false,
                "orderedItems": [{
                    "id": 1,
                    "menuItem": {
                        "id": 23,
                        "posId": "23",
                        "title": "GRILLED CHICKEN",
                        "price": 200,
                        "category": "LUNCH N DINNER",
                        "unit": "",
                        "quantity": 1,
                        "description": "SANDWITCH PLATTER"
                    }
                }],
                "shares": [{
                    "parts": 1,
                    "price": 200,
                    "owner": {
                        "id": 2,
                        "firstName": "Georgi",
                        "lastName": "Vladimirov",
                        "email": "demolisher@abv.bg",
                        "password": "1234",
                        "gender": "MALE"
                    },
                    "isPaid": false
                }],
                "price": 200
            }, {
                "id": 5,
                "totalParts": 1,
                "isPaid": false,
                "orderedItems": [{
                    "id": 3,
                    "menuItem": {
                        "id": 27,
                        "posId": "27",
                        "title": "ICE TEA",
                        "price": 0,
                        "category": "BEVERAGE & DRINKS",
                        "unit": "",
                        "quantity": 1,
                        "description": "COLD BEVERAGE"
                    }
                }],
                "shares": [{
                    "parts": 1,
                    "price": 0,
                    "owner": {
                        "id": 3,
                        "firstName": "Aleksandar",
                        "lastName": "Avramov",
                        "email": "avramov@abv.bg",
                        "password": "1234",
                        "gender": "MALE"
                    },
                    "isPaid": false
                }],
                "price": 0
            }, {
                "id": 2,
                "totalParts": 4,
                "isPaid": false,
                "orderedItems": [{
                    "id": 4,
                    "menuItem": {
                        "id": 29,
                        "posId": "29",
                        "title": "LEMONADE",
                        "price": 100,
                        "category": "BEVERAGE & DRINKS",
                        "unit": "",
                        "quantity": 1,
                        "description": "COLD BEVERAGE"
                    }
                }],
                "shares": [{
                    "parts": 1,
                    "price": 25,
                    "owner": {
                        "id": 3,
                        "firstName": "Aleksandar",
                        "lastName": "Avramov",
                        "email": "avramov@abv.bg",
                        "password": "1234",
                        "gender": "MALE"
                    },
                    "isPaid": false
                }, {
                    "parts": 1,
                    "price": 25,
                    "owner": {
                        "id": 2,
                        "firstName": "Georgi",
                        "lastName": "Vladimirov",
                        "email": "demolisher@abv.bg",
                        "password": "1234",
                        "gender": "MALE"
                    },
                    "isPaid": false
                }],
                "price": 100
            }, {
                "id": 4,
                "totalParts": 4,
                "isPaid": false,
                "orderedItems": [{
                    "id": 2,
                    "menuItem": {
                        "id": 7,
                        "posId": "7",
                        "title": "APPLE JUICE",
                        "price": 50,
                        "category": "BEVERAGE & DRINKS",
                        "unit": "",
                        "quantity": 1,
                        "description": "JUICES"
                    }
                }, {
                    "id": 5,
                    "menuItem": {
                        "id": 7,
                        "posId": "7",
                        "title": "APPLE JUICE",
                        "price": 50,
                        "category": "BEVERAGE & DRINKS",
                        "unit": "",
                        "quantity": 1,
                        "description": "JUICES"
                    }
                }],
                "shares": [{
                    "parts": 1,
                    "price": 25,
                    "owner": {
                        "id": 3,
                        "firstName": "Aleksandar",
                        "lastName": "Avramov",
                        "email": "avramov@abv.bg",
                        "password": "1234",
                        "gender": "MALE"
                    },
                    "isPaid": false
                }],
                "price": 100
            }]
        };

        this.groupData(data);
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
            let existingIndex = this.billList.map(element => { return element.menuItem.id; }).indexOf(concatData[index].menuItem.id);
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
     * Create array with separated elements
     * @param index
     */
    public goToEditModePerItem(index): void {
        let item = this.billList[index];
        let newDataPerItem = [];
        let count = item.menuItem.count;
        item.menuItem.count = 1;
        for(let i = 0; i < count; i++){
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

    public removeEntry(index: number): void {
        this.billList.splice(index, 1);
    }

    public goToEditMode(): void {
        this.isEditMode = true;
    }
}
