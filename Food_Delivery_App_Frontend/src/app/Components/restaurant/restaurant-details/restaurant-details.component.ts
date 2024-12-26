import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { LoaderService } from '../../../Shared/service/loader.service';

@Component({
  selector: 'app-restaurant-details',
  imports: [RouterLink],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css'
})
export class RestaurantDetailsComponent implements OnInit {

  activeRoute = inject(ActivatedRoute)
  restService = inject(RestaurantServiceService)
  loader = inject(LoaderService)

  RestaurantDetails:any = []

  restaurantId:number = 0

  ngOnInit(): void {
    this.getDetails()
  }

  getDetails(){
    this.loader.showLoader()
    this.activeRoute.paramMap.subscribe(params=>{
      this.restaurantId = +params.get('restaurentId')!
    })

    this.restService.restaurantDetails(this.restaurantId).subscribe((res:any)=>{
      if(res){
        this.RestaurantDetails = res
        this.loader.hideLoader()
      }
    }, err =>{
      console.log("Error", err)
      this.loader.hideLoader()
    })
  }
}
