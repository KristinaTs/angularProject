import {
  Injectable,
  PLATFORM_ID,
  Inject
} from '@angular/core';
import {
  Headers,
  Http,
  RequestOptions
} from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { CookieService } from './cookie.service';

declare var Zone: any;

@Injectable()
export class HttpService {
  // set base url here
  private baseUrl: any = 'http://192.168.100.6:8080';
  private defaultOptions: any = {
    async: false,
    showMessages: true,
    contentsType: 'application/json'
  };

  constructor(
    private http: Http,
    private cookie: CookieService
  ) { }

  /**
   * Sends POST request to a given url
   */
  /**
   * Sends POST request to a given url
   */
  public post(url: string, params: any = {}, options: any = {}): Promise<any> {
    let config = this.createCorrectParams(options);
    let customHeaders = this.getHeaders('post', config);
    // customHeaders['Autorizations']= 'Basic '+ params.username + ':' + params.password;
    let headers = new RequestOptions({ headers: customHeaders }),
      postUrl = this.baseUrl + '/' + url;


    return new Promise((resolve, reject) => {

        this.http.post(postUrl, params, headers)
          .toPromise()
          .then(data => {
            let response = data.json();
            //change token if needed
            resolve(response);
          })
          .catch(error => {
            let parsedError = this.errorHandler(error, this);
            reject(parsedError);
          });
    });
  }
  /**
   * GET request
   * */

  public get(url: string, params: any = {}, options: any = {}): Promise<any> {
    const config = this.createCorrectParams(options);

    let getParams = this.convertDataToParams(params),
      headers = new RequestOptions({ headers: this.getHeaders('get', config) }),
      getUrl: string = this.baseUrl + '/' + url;

    if (getParams !== '') {
      if (getUrl.indexOf('?') >= 0) {
        getUrl += '&' + getParams;
      } else {
        getUrl += '?' + getParams;
      }
    }

    return new Promise((resolve, reject) => {
        return this.http.get(getUrl, headers)
          .toPromise()
          .then(res => {
            resolve(res.json());
          })
          .catch(error => {
            let parsedError = this.errorHandler(error, this);
            reject(parsedError);
          });
     });
  }

  /**
   * DELETE request
   */
  public delete(url: string, options: any = {}): Promise<any> {
    const config = this.createCorrectParams(options),
      headers = new RequestOptions({ headers: this.getHeaders('delete', config) });


    return new Promise((resolve, reject) => {
        this.http.delete(this.baseUrl + '/' + url, headers)
          .toPromise()
          .then(data => {
            const response = data.json();
            resolve(response);
          })
          .catch(error => {
            const parsedError = this.errorHandler(error, this);
            reject(parsedError);
          });
    });
  }

  /**
   * PUT request
   */
  public put(url: string, params: any = {}, options: any = {}): Promise<any> {
    const config = this.createCorrectParams(options),
      headers = new RequestOptions({ headers: this.getHeaders('put', config) });


    return new Promise((resolve, reject) => {
        this.http.put(this.baseUrl + '/' + url, params, headers)
          .toPromise()
          .then(data => {
            const response = data.json();
            resolve(response);
          })
          .catch(error => {
            const parsedError = this.errorHandler(error, this);
            reject(parsedError);
          });
    });
  }

  private getHeaders(method: string, config: any): Headers {
    let paramsObj = {};
    const login = this.cookie.get('user');

    if (config.contentsType === 'multipart/form-data') {
      return new Headers(paramsObj);
    }
    paramsObj['Content-Type'] = 'application/json';

    if (method === 'delete') {
      paramsObj['Content-Type'] = 'x-www-form-urlencoded';
    }

    if (this.cookie.get('user') !== null && this.cookie.get('user') !== '') {
      paramsObj['User'] = this.cookie.get('user');
    }

   // let encode = new String(btoa('avramov@abv.bg:1234'));
    //paramsObj['Authorization'] = 'Basic '+ encode;

    return new Headers(paramsObj);
  }

  /**
   * Adds parameters to the
   * default parameters
   * */
  private createCorrectParams(params: any): any {
    let defaultParams: any = null;

    try {
      defaultParams = JSON.parse(JSON.stringify(this.defaultOptions));
    } catch (e) {
      defaultParams = {};
    }

    for (const i in params) {
      defaultParams[i] = params[i];
    }
    return defaultParams;
  }


  /**
   * Creates a string with query parameters
   *
   */
  private convertDataToParams(params: any): string {
    let paramsToString = '';

    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        const stringifiedParam = (typeof params[param] !== 'string') ? JSON.stringify(params[param]) : params[param];
        paramsToString += param + '=' + encodeURIComponent(stringifiedParam) + '&';
      }
    }
    paramsToString = paramsToString.slice(0, -1);
    return paramsToString;
  }

  /**
   * Processing server error
   *
   */
  private errorHandler(error, instance) {
    try {
      var errorJson: any = error._body !== '' ? error.json() : {};
    } catch (e) {
      errorJson = {};
    }

    const parsedError: any = {
      title: typeof errorJson.title !== 'undefined' ? errorJson.title : '',
      success: false,
      status: error.status
    };

    if (errorJson.messages) {
      console.error(errorJson.messages);
    }

    return parsedError;
  }
}
