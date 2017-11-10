import {
  Injectable
} from '@angular/core';
import {HttpService} from "./http.service";

@Injectable()
export class RestaurantListingService {

  constructor(
    private httpService: HttpService
  ) {}

  public baseUrl: string = 'restaurant-listing';


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
    return new Promise<any>((resolve, reject)=> {
      this.httpService.get(this.baseUrl)
        .then((response: any) => {
            resolve(response);
        })
        .catch((error) => {
            reject(error)
        });
    });
  }


  /**
   * Get information for specific restaurant
   * @param restaurantId
   * @returns {Promise<any>}
   */
  public getRestaurantInformation(restaurantId: number): Promise<any> {
   return this.httpService.get(this.baseUrl, restaurantId);
  }

}
