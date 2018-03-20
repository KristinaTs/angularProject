import {
  Component,
  OnInit
} from '@angular/core';
import {Router} from "@angular/router";



@Component({
  templateUrl: 'top-navigation.component.html',
  selector: 'top-navigation'
})
export class TopNavigationComponent{
  public expandVisible: boolean = false;

  constructor(public router: Router) {
    this.router = router;
  }

  public toggleTopNavigation() : void {
    this.expandVisible = !this.expandVisible;
  }

}
