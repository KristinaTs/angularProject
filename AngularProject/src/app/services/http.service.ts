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

@Injectable()
export class HttpService {
  //set base url here
  private baseUrl: any = '';
  private defaultOptions: any = {
    async: false,
    showMessages: true,
    setToken: true,
    contentsType: 'application/json'
  };
  private interceptors: Function[] = [];
  private routerParams: any;
  public currentUrlSlug: string;

  private pendingRequestsArray: Function[] = [];
  private isRefreshRequestSend: boolean = false;

  constructor(
    private http: Http,
    private cookie: CookieService
  ) { }


  /**
   * Sends POST request to a given url
   */
  public post(url: string, params: any = {}, options: any = {}): Promise<any> {
    let config = this.createCorrectParams(options),
      headers = new RequestOptions({ headers: this.getHeaders('post', config) }),
      postUrl = this.baseUrl + '/' + url;

    return new Promise((resolve, reject) => {
      if ((!this.isRefreshRequestSend && this.pendingRequestsArray.length == 0)) {
          this.isRefreshRequestSend = true;
        this.http.post(postUrl, params, headers)
          .toPromise()
          .then(data => {
            let response = data.json();
            //change token if needed
            this.callInterceptorFunctions(response, url);
            resolve(response);
          })
          .catch(error => {
            let parsedError = this.errorHandler(error, this);
            this.callInterceptorFunctions(parsedError, url);
            reject(parsedError);
          });
      } else {
        this.pendingRequestsArray.push(() => {
          this.post(url, params, options).then((response: any) => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    });
  }

  /**
   * GET request
   * */

  public get(url: string, params: any = {}, options: any = {}): Promise<any> {
    let config = this.createCorrectParams(options);

    let getParams = this.convertDataToParams(params),
      headers = new RequestOptions({ headers: this.getHeaders('get', config) }),
      getUrl: string = this.baseUrl + '/' + url;

    if (getParams !== '') {
      if(getUrl.indexOf('?') >= 0) {
        getUrl += '&' + getParams;
      } else {
        getUrl += '?' + getParams;
      }
    }

    return new Promise((resolve, reject) => {
      if ((!this.isRefreshRequestSend && this.pendingRequestsArray.length == 0)) {
        this.isRefreshRequestSend = true;


        this.http.get(getUrl, headers)
          .toPromise()
          .then(data => {
            let response = data.json();
            this.callInterceptorFunctions(response, url);
            resolve(response);
          })
          .catch(error => {
            let parsedError = this.errorHandler(error, this);
            this.callInterceptorFunctions(parsedError, url);
            reject(parsedError);
          });
      } else {
        this.pendingRequestsArray.push(() => {
          this.get(url, params, options).then((response:any) => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    });
  }

  /**
   * DELETE request
   */
  public delete(url: string, options: any = {}): Promise<any> {
    let config = this.createCorrectParams(options),
      headers = new RequestOptions({ headers: this.getHeaders('delete', config) });


    return new Promise((resolve, reject) => {
      if ((!this.isRefreshRequestSend && this.pendingRequestsArray.length == 0)) {
        this.isRefreshRequestSend = true;


        this.http.delete(this.baseUrl + '/' + url, headers)
          .toPromise()
          .then(data => {
            let response = data.json();
            this.callInterceptorFunctions(response, url);
            resolve(response);
          })
          .catch(error => {
            let parsedError = this.errorHandler(error, this);
            this.callInterceptorFunctions(parsedError, url);
            reject(parsedError);
          });
      } else {
        this.pendingRequestsArray.push(() => {
          this.delete(url, options).then((response: any) => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    });
  }

  /**
   * PUT request
   */
  public put(url: string, params: any = {}, options: any = {}): Promise<any> {
    let config = this.createCorrectParams(options),
      headers = new RequestOptions({ headers: this.getHeaders('put', config) });


    return new Promise((resolve, reject) => {
      if ((!this.isRefreshRequestSend && this.pendingRequestsArray.length == 0)) {
        this.isRefreshRequestSend = true;

        this.http.put(this.baseUrl + '/' + url, params, headers)
          .toPromise()
          .then(data => {
            let response = data.json();
            this.callInterceptorFunctions(response, url);
            resolve(response);
          })
          .catch(error => {
            let parsedError = this.errorHandler(error, this);
            this.callInterceptorFunctions(parsedError, url);
            reject(parsedError);
          });
      } else {
        this.pendingRequestsArray.push(() => {
          this.put(url, params, options).then((response: any) => {
            resolve(response);
          }).catch((error) => {
            reject(error);
          });
        });
      }
    });
  }

  private getHeaders(method: string, config: any): Headers {
    let paramsObj = {};
    let login = this.cookie.get('user');

    if (config.contentsType == 'multipart/form-data') {
      return new Headers(paramsObj);
    }
    paramsObj['Content-Type'] = 'application/json';

    if (method == 'delete') {
      paramsObj['Content-Type'] = 'x-www-form-urlencoded';
    }

    if (this.cookie.get('user') !== null && this.cookie.get('user') !== '') {
      paramsObj['User'] = this.cookie.get('user');
    }

    return new Headers(paramsObj);
  }

  /**
   * Executes all pending requests
   */
  private executePendingRequests(): void {
    while (this.pendingRequestsArray.length != 0) {
      let request: Function = this.pendingRequestsArray.pop();
      request();
    }
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

    for (let i in params) {
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

    for (let param in params) {
      if (params.hasOwnProperty(param)) {
        let stringifiedParam = (typeof params[param] != 'string') ? JSON.stringify(params[param]) : params[param];
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

    let parsedError: any = {
      title: typeof errorJson.title != 'undefined' ? errorJson.title : '',
      success: false,
      status: error.status
    };

    if (errorJson.messages) {
      console.error(errorJson.messages);
    }

    return parsedError;
  }


  /**
   * Adds a given interceptor function,
   * which is executed in every HTTP request
   * @param {Function} interceptor
   * @returns {number} - id of the interceptor, can be used to remove the interceptor
   */
  public addInterceptor(interceptor: Function): number {
    return this.interceptors.push(interceptor) - 1;
  }

  /**
   * Calls all interceptor functions
   * @param {any} response - request's response
   * @param {string} url - url of the request
   */
  private callInterceptorFunctions(response: any, url: string): void {
    for (let interceptor of this.interceptors) {
      interceptor(response, url);
    }
  }

  /**
   * Removes an interceptor function from interceptors array by id
   * @param {number} id
   */
  public removeInterceptor(id: number): void {
    this.interceptors.splice(id, 1);
  }
}
