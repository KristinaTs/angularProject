import {
  Component,
  OnInit
} from '@angular/core';

@Component({
  templateUrl: 'restaurant-list.component.html'
})
export class RestaurantListComponent implements OnInit {

  public restaurantList = [
    {
      id: 1,
      name :'Red Rooster Restaurant',
      image: 'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg',
      address: 'ул. Цар Калоян 1А',
      raiting: '4/5',
      raitingStats: {
        food: '5/5',
        place: '3/5',
        staff: '5/5'
      }
    },
    {
      id: 2,
      name :'Happy bar and grill',
      image: 'https://beebom-redkapmedia.netdna-ssl.com/wp-content/uploads/2016/01/Reverse-Image-Search-Engines-Apps-And-Its-Uses-2016.jpg',
      address: 'ул. Цар Калоян 1А',
      raiting: '4/5',
      raitingStats: {
        food: '5/5',
        place: '3/5',
        staff: '5/5'
      }
    }
  ];

  public ngOnInit(): void {
    console.log('test')
  }
}
