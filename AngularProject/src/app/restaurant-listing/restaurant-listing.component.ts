import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  templateUrl: 'restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  public ngOnInit(): void {
    console.log('test')
  }
}
