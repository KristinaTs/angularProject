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
  public createNewBill(restaurantId: number): Promise<any> {
    return this.httpService.post('ticket/request-ticket',  restaurantId);
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
}
