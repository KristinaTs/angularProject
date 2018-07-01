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
import {Router} from "@angular/router";

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
    @Input('title') title = "";

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
    public viewLoaded = false;
    public selectedOption;
    public selectedDistirbutionId;
    public distributions = [];
    public userShareOption;
    public isShareActive = true;

    constructor(public restaurantService: RestaurantListingService, public billInformationService: BillInformationService, public router: Router) {}

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
        //this.checkIfCurrentUserHasShares();
        this.participants = this.ticketPayableData.participantDatas;
        this.isDistributionSet = this.ticketPayableData.isDistributionSet;
        this.getCurrentUserTotalBill();
        this.getDistributionsAndShares();
        this.totalBill = (this.ticketPayableData.price / 100) + 'лв';
        this.viewLoaded = true;
    }

    public getDistributionsAndShares() {
        let indexForDistribution = this.ticketPayableData.participantDatas.map((person) => {
            return person.id;
        }).indexOf(this.selectedUser.id);
        this.distributions = this.ticketPayableData.participantDatas[indexForDistribution].distributions;
        this.distributions.forEach((share, index) => {
            share['selected'] = false;
        });
        this.distributions[0].selected = true;
        this.selectedDistirbutionId = this.distributions[0].id;
        //always start from the first element
        this.shares = this.distributions[0].shares;
        this.userShareOption = this.shares.filter((share) => {
            if (share.isCurrent) {
                return share;
            }
        })[0];
        let indexForSelecedElement = this.shares.map((share) => {
            return share.isCurrent
        }).indexOf(true);
        this.setSharesForSelf(indexForSelecedElement);
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

    public getSelectedUserTotalBill(index): void {
    let participants = this.billSummary.participants;
        let price = participants[index].totalPrice;
        if ( price && price > 0) {
            this.myBill = (price / 100) + ' лв';
        } else {
            this.myBill = '0 лв';
        }
    }
    /**
     * Select a participant
     * @param {number} participantIndex
     */
    public toggleSelectedParticipant(participantIndex: number): void {
        this.participants.forEach((participant, index) => {
            participant['selected'] = participantIndex === index;
        });
        if(this.selectedUser.id != this.participants[participantIndex].id) {
            this.selectedUser = this.participants[participantIndex];
            this.isShareActive = this.selectedUser.id == this.currentUser.id;
            this.getDistributionsAndShares();
        }
//TODO
        //this.getSelectedUserTotalBill(participantIndex);
    }

    /**
     * Select the count on which we split the bill
     * @param {number} shareIndex
     */
    public toggleSelectedDistibutionCount(distributionIndex: number) {
        if (this.distributions[distributionIndex].isSelectable) {
            this.distributions.forEach((share, index) => {
                share['selected'] = distributionIndex === index;
            });
            this.selectedDistirbutionId = distributionIndex;
            this.shares = this.distributions[distributionIndex].shares;
        }
    }

    /**
     * Set the number of shares per user
     * @param {number} shareIndex
     */
    public setSharesForSelf(shareIndex: number): void {
        if (this.currentUser.id == this.selectedUser.id) {
            this.shares.forEach((share, index) => {
                share['isCurrent'] = shareIndex === index;
            });
            if (this.shares[shareIndex].number !== this.userShareOption.number) {
                this.canApply = true;
            } else {
                this.canApply = false;
            }
            this.selectedOption = this.shares[shareIndex];
            this.totalPriceString = (this.selectedOption.price / 100) + ' лв';
        }
    }

    /**
     * Close model when clicking on white check
     */
    public initOrUpdateTicket(): void {
        let objectToSend = {};
        if(!this.isDistributionSet) {
            objectToSend = {
                distributionId: this.selectedDistirbutionId,
                myParts: this.selectedOption.number
            };
            switch (this.type) {
                case 'main-screen':
                    this.billInformationService.initNewTicket(this.billSummary.id, objectToSend).then((data) => {
                        //TODO
                        this.closeModal.emit();
                        console.log('SUCCESS')
                    });
                    break;
                case 'step-2':
                    console.log(objectToSend);
                    this.billInformationService.initNewSubticketTicket(this.billSummary.id, this.subticketId, objectToSend).then((data) => {
                        //TODO
                        this.closeModal.emit();
                        console.log('SUCCESS')
                    });
                    break;
            }
        } else if(this.isDistributionSet && this.canApply) {
            objectToSend = {
                distributionId: this.selectedDistirbutionId,
                myParts: this.selectedOption.number
            };
            switch (this.type) {
                case 'main-screen':
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

    /***
     * Change pay mode to true so we can show the payment buttons
     */
    public goToPayScreen(): void {
        this.router.navigate([`/my-bill/${this.billSummary.id}`]);
    }
}
