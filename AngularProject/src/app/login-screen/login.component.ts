import {
  Component
} from '@angular/core';
import {RestaurantListingService} from "../services/restaurant-listing.service";
import {Router} from "@angular/router";



@Component({
  templateUrl: 'login.component.html',
  selector: 'login'
})
export class LoginComponent {
public username;
public password;

constructor(private restaurantService: RestaurantListingService, private router: Router) {

}


public login(): void {
  // let form = new FormData();
  // form.append('username', this.username);
  // form.append('password', this.password);

  let form = {
    username: this.username,
    password: this.password
  }

  this.restaurantService.login(form).then(data => {
    this.router.navigate(['/restaurant-listing']);
      });
  }

}
