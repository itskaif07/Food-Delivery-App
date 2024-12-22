import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';

@Component({
  selector: 'app-restaurantslist',
  imports: [RouterLink, RouterOutlet],
  templateUrl: './restaurantslist.component.html',
  styleUrl: './restaurantslist.component.css'
})
export class RestaurantslistComponent implements OnInit {

  restaurantsList:any[] = [];

  constructor(private restService: RestaurantServiceService){}

  ngOnInit(): void {
      this.restService.getAllRestaurants().subscribe((res:any)=>{
        this.restaurantsList = res
      })
  }

}
