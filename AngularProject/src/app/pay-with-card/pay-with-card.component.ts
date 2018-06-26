import {Component} from "@angular/core";
import {SharedCommunicationService} from "../services/shared-communication.service";

@Component({
    selector: 'pay-with-card',
    templateUrl: './pay-with-card.component.html'
})
export class PayWithCardComponent {

    constructor(private sharedCommunicationService: SharedCommunicationService){
        // this.totalBill = this.sharedCommunicationService.getState()['totalBill'];
    }

    ngOnInit() {
        this.totalBill = this.sharedCommunicationService.getState()['totalBill'];

    }

    totalBill: number = 26;




}