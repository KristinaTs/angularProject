import {
    Component
} from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";


@Component({
    templateUrl: 'login.component.html',
    selector: 'login'
})
export class LoginComponent {
    public username;
    public password;

    constructor(private loginService: LoginService, private router: Router) {}


    public login() {
        // let form = new FormData();
        // form.append('username', this.username);
        // form.append('password', this.password);

        let form = {
            username: this.username,
            password: this.password
        };

        //this.router.navigate(['/restaurant-listing']);

        this.loginService.login(form).then(data => {
            this.router.navigate(['/restaurant-listing']);
        }).catch((err) => {
            console.log(err);
        });
    }
}
