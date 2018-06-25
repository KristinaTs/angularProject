import {Injectable} from '@angular/core';
import {HttpService} from './http.service';

@Injectable()
export class LoginService {

    constructor(private httpService: HttpService) {}

    /**
     * Login user and call httpservice to save user
     * @param form
     * @returns {Promise<any>}
     */
    public login(form): Promise<any> {
        return new Promise((resolve, reject) => {
                this.httpService.post('logme', form, {contentsType: 'multipart/form-data'}).then((user) => {
                    if (user) {
                        let string = new String(btoa(user.username + ':' + user.password));
                        this.httpService.setAutorizationString(string);
                        resolve(user);
                    } else {
                        reject(user);
                    }
                })
            })
    }
}