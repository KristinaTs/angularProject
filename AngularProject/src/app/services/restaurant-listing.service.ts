import {
  Injectable
} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class RestaurantListingService {

  constructor(
    private httpService: HttpService
  ) {}

  public baseUrl = 'poses';


  /**
   * The method 'getAllRestaurants' and 'getRestaurantInformation'
   * do the same, I have written them in different ways just to show
   * the different syntax of the method
   */

    /**
     *
     * @returns {Promise<any>}
     */
  public getCurrentUser(): Promise<any> {
      return this.httpService.get('customer/details');
  }

    /**
     * Get bill summary (id, password, participants)
     * @param id
     * @returns {Promise<any>}
     */
  public getBillSummary(id): Promise<any> {
      return this.httpService.get(`ticket/${id}/summary`);
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
   * Get all the restaurants
   * @returns {Promise<any>}
   */
  public getAllRestaurants(): Promise<any> {
    // return new Promise<any>((resolve, reject) => {
       return this.httpService.get(this.baseUrl)
        .then((response: any) => {
            console.log(response);
            return response;
        })
        .catch((error) => {
           // reject(error);
        });
   //  });
  }


  /**
   * Get information for specific restaurant
   * @param restaurantId
   * @returns {Promise<any>}
   */
  public getRestaurantInformation(restaurantId: number): Promise<any> {
   return this.httpService.get(this.baseUrl + '/' + restaurantId);
  }

  /**
   * Create new bill for the restaurant
   * @param restaurantId
   * @returns {Promise<any>}
   */
  public createNewBill(objectToSend: object): Promise<any> {
    return this.httpService.post('ticket/request-ticket',  objectToSend);
  }

  public getSocket(): Promise<any> {
    return this.httpService.get('/ticket-websocket');
  }

  /**
   * Get information for current bill
   * @param billId
   * @returns {Promise<any>}
   */
  public getBillInformation(billId: number): Promise<any> {
    return this.httpService.get('ticket/' + billId);
  }

  public login(form): Promise<any> {
    return this.httpService.post('login', form, {contentsType: 'x-www-form-urlencoded'});
  }

    /**
     * Send request to join bill (restaurant information screen)
     * @param id
     * @param password
     * @returns {Promise<any>}
     */
  public sendJoinRequest(id, password): Promise<any> {
      return this.httpService.post(`tikcet/${id}/join`,{password: password});
  }
}
