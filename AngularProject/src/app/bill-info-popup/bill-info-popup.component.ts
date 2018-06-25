import {
    Component,
    HostListener,
    Output,
    Input,
    EventEmitter,
    OnInit
} from "@angular/core";

import {RestaurantListingService} from '../services/restaurant-listing.service';
import {BillInformationService} from "../services/bill-information.service";

@Component({
    selector: 'bill-info-popup',
    templateUrl: './bill-info-popup-component.html',
    styleUrls: ['./bill-info-popup.component.scss'],
    host: {class: 'basic-overlay modal-overlay'}
})

export class BillInfoPopupComponent implements OnInit {
    @Output() closeModal: EventEmitter<any> = new EventEmitter<any>();
    @Input('ticketPayableData') ticketPayableData;
    @Input('currentUser') currentUser;
    @Input('billSummary') billSummary;
    @Input('type') type;
    @Input('subticketId') subticketId = null;

    public participants = [];
    public shares = [];
    public shareOptions = [];
    public isDistributionSet = false;
    public myTotalShareNumber = 0;
    public totalPriceString = '0 лв';
    public myBill = '0 лв';
    public totalBill = '0 лв';
    public canApply = false;
    public selectedUser;
    public freeIds = [];
    public viewLoaded = false;
    public ticketDataSharesUsers = [];
    public selectedOption;
    public selectedDistirbutionId;
    public selectedIdsPerUser = [];
    public selectedPartsFromUser = [];

    constructor(public restaurantService: RestaurantListingService, public billInformationService: BillInformationService) {
    }

    @HostListener('click', ['$event'])
    public onClick(event: any): void {
        if (event.target.tagName.toLowerCase() === 'bill-info-popup') {
            this.closeModal.emit();
        }
    }

    /**
     * On init separate the data
     */
    public ngOnInit(): void {
        this.selectedUser = this.currentUser;
        this.getCorrectData();
    }

    public getCorrectData(): void {
        //console.log(this.ticketPayableData);
        //console.log(this.currentUser);
        this.checkIfCurrentUserHasShares();
        this.participants = this.billSummary.participants;
        this.isDistributionSet = this.ticketPayableData.isDistributionSet;
        this.freeIds = this.ticketPayableData.freeIds;
        this.ticketDataSharesUsers = this.ticketPayableData.shares;
        this.getCurrentUserTotalBill();
        if (this.isDistributionSet) {
            this.updateDataWhenDistributionIsSet();
        } else {
            this.shares = JSON.parse(JSON.stringify(this.ticketPayableData.distributions));
            this.shares[0].selected = true;
            this.shareOptions.push({
                totalParts: 0,
                value: 0,
                selected: true
            });
            this.shareOptions.push({
                totalParts: 1,
                value: this.shares[0].values[0]
            });
        }
        this.totalBill = (this.ticketPayableData.price / 100) + 'лв';
        this.viewLoaded = true;
    }
    /**
     * Find current user in participants array and get total price
     */
    public getCurrentUserTotalBill(): void {
        let participants = this.participants;
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

    public updateDataWhenDistributionIsSet(): void {
        this.shares = [this.ticketPayableData.distributions[this.ticketPayableData.selectedDistributionId - 1]];
        let values = this.ticketPayableData.distributions[this.ticketPayableData.selectedDistributionId - 1].values;
        //Here we set the correct value for each share
        // get index from taked Ids
        this.getSelectedUserTakenIds();

        let sharesArray = this.selectedUser.takenIds.concat(this.freeIds);
        this.calculateSelectedUserBill();
        //console.log(values);
        //console.log(sharesArray)

        this.shareOptions = [];
        for (let i = 0; i <= sharesArray.length; i++) {
            let valueForShareOption = this.calculateValueForShareOption(sharesArray, i, values);

            let selectedId = this.selectedUser.takenIds.length;
            //бвойката е селецтнатия усер + freeIds
            //values = current user ids;
            if (i == selectedId) {
                this.shareOptions.push({
                    totalParts: i,
                    value: valueForShareOption,
                    selected: true
                });
            } else {
                this.shareOptions.push({
                    totalParts: i,
                    value: valueForShareOption,
                    selected: false
                });
            }
        }

        //console.log(this.shareOptions);
    }

    public calculateSelectedUserBill() {
        let myTotalShareNumber = 0;
        for(let i = 0; i < this.selectedPartsFromUser.length; i ++) {
            myTotalShareNumber+=this.shares[0].values[this.selectedPartsFromUser[i]];
        }
        this.totalPriceString = (myTotalShareNumber/100) + 'лв';
    }

    /**
     * Return the correct valu for each option
     * @param array
     * @param index
     * @param valuesArray
     * @returns {number}
     */
    public calculateValueForShareOption(array, index, valuesArray): number {
        let value = 0;
        if (index == 0) {
            return 0;
        } else {
            array.forEach((indexValue, i) => {
                if (i < index) {
                    value += valuesArray[indexValue];
                }
            });
            return value;
        }
    }

    /**
     * Check if the currently logged user has any shares
     * to determine the color of the button
     */
    public checkIfCurrentUserHasShares(): void {
        let shares = this.ticketPayableData.shares;
        let index = shares.map((participant) => {
            return participant.id;
        }).indexOf(this.currentUser.id);
        if (index < 0) {
            this.currentUser.hasShares = false;
        } else {
            this.currentUser.hasShares = true;
        }
    }

    /**
     * Select a participant
     * @param {number} participantIndex
     */
    public toggleSelectedParticipant(participantIndex: number): void {
        this.participants.forEach((participant, index) => {
            if (participantIndex === index) {
                this.selectedUser = this.participants[index];
            }
            participant['selected'] = participantIndex === index;
        });
        this.getSelectedUserTakenIds();
        this.updateDataWhenDistributionIsSet();
    }

    /**
     * Select the count on which we split the bill
     * @param {number} shareIndex
     */
    public toggleSelectedShareCount(shareIndex: number) {
        if (!this.isDistributionSet) {
            this.shares.forEach((share, index) => {
                share['selected'] = shareIndex === index;
            });
            this.selectedDistirbutionId = shareIndex;
            this.shares = [this.ticketPayableData.distributions[shareIndex]];
            let values = this.ticketPayableData.distributions[this.ticketPayableData.selectedDistributionId - 1].values;

            this.shares = JSON.parse(JSON.stringify(this.ticketPayableData.distributions));
            this.shares[shareIndex].selected = true;
            this.shareOptions = [];
            this.shareOptions.push({
                totalParts: 0,
                value: 0,
                selected: true
            });
            this.shareOptions.push({
                totalParts: 1,
                value: this.shares[0].values[0]
            });
        }
    }

    /**
     * Get the takenIds when an user is selected
     */
    public getSelectedUserTakenIds(): void {
        let userIndex = this.ticketDataSharesUsers.map((user) => {
            return user.id;
        }).indexOf(this.selectedUser.id);
        this.selectedUser.takenIds = this.ticketDataSharesUsers[userIndex].takenIds;
        this.selectedPartsFromUser = [...this.selectedUser.takenIds];
        //this.changeSelectedUserPartValue(this.selectedUser.takenIds.length - 1);
    }

    /**
     * Set the number of shares per user
     * @param {number} shareIndex
     */
    public setSharesForSelf(shareIndex: number): void {
        this.shareOptions.forEach((share, index) => {
            share['selected'] = shareIndex === index;
        });
        //TODO has to be cheged is the state is chaged ]
        this.selectedOption = this.shareOptions[shareIndex];
        // kogato indecsa e razlichek  ili kogato disxtrubution e false
        if (shareIndex !== this.currentUser.takenIds.length || this.isDistributionSet == false) {
            this.canApply = true;
        } else {
            this.canApply = false;
        }

        if(shareIndex == this.selectedUser.takenIds.length){
            this.selectedPartsFromUser = [...this.selectedUser.takenIds];
        } else if(shareIndex > this.selectedUser.takenIds.length) {
            let numberOfNewShares = shareIndex - this.selectedUser.takenIds.length;
            for(let i = 0; i < numberOfNewShares; i++) {
                this.selectedPartsFromUser.push(this.freeIds[i]);
            }
        } else if(shareIndex < this.selectedUser.takenIds.length) {
            let numberOfNewShares = this.selectedUser.takenIds.length - shareIndex;
            for(let i = 0; i < numberOfNewShares; i++) {
                this.selectedPartsFromUser.pop();
            }
        }

        this.calculateSelectedUserBill();
    }

    /**
     * Set the selectes user price to pay
     * @param value
     */
    public changeSelectedUserPartValue(shareIndex): void {
        let value = this.shareOptions[shareIndex].value;
        let myTotalShareNumber = value;
        this.totalPriceString = (myTotalShareNumber / 100) + ' лв';
    }

    /**
     * Close model when clicking on white check
     */
    public initOrUpdateTicket(): void {
        let objectToSend = {};

        if(!this.isDistributionSet) {
            objectToSend = {
                distributionId: this.selectedDistirbutionId,
                myParts: this.selectedOption.totalParts
            };
            switch (this.type) {
                case 'main-screem':
                    this.billInformationService.initNewTicket(this.billSummary.id, objectToSend).then((data) => {
                        //TODO
                        this.closeModal.emit();
                        console.log('SUCCESS')
                    });
                    break;
                case 'step-2':
                    this.billInformationService.initNewSubticketTicket(this.billSummary.id, this.subticketId, objectToSend).then((data) => {
                        //TODO
                        this.closeModal.emit();
                        console.log('SUCCESS')
                    });
                    break;
            }
        } else  if(this.isDistributionSet && this.canApply) {
            objectToSend = {
                myParts: this.selectedOption.totalParts
            };
            switch (this.type) {
                case 'main-screem':
                    this.billInformationService.updateTicket(this.billSummary.id, objectToSend).then((data) => {
                        //TODO
                        this.closeModal.emit();
                        console.log('SUCCESS');
                    });
                    break;
                case 'step-2':
                    this.billInformationService.updateSubticket(this.billSummary.id, this.subticketId, objectToSend).then((data) => {
                        //TODO
                        this.closeModal.emit();
                        console.log('SUCCESS');
                    });
            }
        }
    }
}
