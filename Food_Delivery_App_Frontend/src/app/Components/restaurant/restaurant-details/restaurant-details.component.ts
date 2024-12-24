import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';

@Component({
  selector: 'app-restaurant-details',
  imports: [],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css'
})
export class RestaurantDetailsComponent implements OnInit {

  activeRoute = inject(ActivatedRoute)
  restService = inject(RestaurantServiceService)

  RestaurantDetails:any = []

  restaurantId:number = 0

  ngOnInit(): void {
    this.getDetails()
  }

  getDetails(){
    this.activeRoute.paramMap.subscribe(params=>{
      this.restaurantId = +params.get('restaurentId')!
    })

    this.restService.restaurantDetails(this.restaurantId).subscribe((res:any)=>{
      if(res){
        this.RestaurantDetails = res
      }
    }, err =>{
      console.log("Error", err)
    })
  }
}
