import {
    Injectable
} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class BillInformationService {
    constructor(
        private httpService: HttpService
    ) {}


    /**
     * Get bill summary (id, password, participants)
     * @param id
     * @returns {Promise<any>}
     */
    public getBillSummary(id): Promise<any> {
        return this.httpService.get(`ticket/${id}/summary`);
    }


    /**
     * Create new bill for the restaurant
     * @param restaurantId
     * @returns {Promise<any>}
     */
    public createNewBill(objectToSend: object): Promise<any> {
        return this.httpService.post('ticket/request-ticket', objectToSend);
    }


    /**
     * Get information for current bill
     * @param billId
     * @returns {Promise<any>}
     */
    public getBillInformation(billId: number): Promise<any> {
        return this.httpService.get('ticket/' + billId);
    }

    /**
     * Send request to join bill (restaurant information screen)
     * @param id
     * @param password
     * @returns {Promise<any>}
     */
    public sendJoinRequest(id, password): Promise<any> {
        return this.httpService.post(`ticket/${id}/join`, {password: password});
    }

    /**
     * Init new object
     * (Called when clicked on lefr pink arrow button)
     * @param billId
     * @param objectToSend
     * @returns {Promise<any>}
     */
    public initNewTicket(billId, objectToSend): Promise<any> {
        return this.httpService.post(`ticket/${billId}/init`, objectToSend);
    }

    /**
     * Update ticket
     * @param id
     * @param object
     * @returns {Promise<any>}
     */
    public updateTicket(id, object): Promise<any> {
        return this.httpService.post(`ticket/${id}/update`, object);
    }

    /**
     * Init subticket per group
     * @param billId
     * @param id
     * @param objectToSend
     * @returns {Promise<any>}
     */
    public initSubticketPerGroup(billId, id, objectToSend): Promise<any> {
        return this.httpService.post(`“/ticket/${billId}/subtickets/${id}/init`, objectToSend);
    }

    /**
     * Get bill suntickets
     * @param id
     * @returns {Promise<any>}
     */
    public getBillSubtickets(id): Promise<any> {
        return this.httpService.get(`"ticket/${id}/subtickets`);
    }

}