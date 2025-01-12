import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { LoaderService } from '../../../Shared/service/loader.service';
import { getAuth } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurant-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './restaurant-details.component.html',
  styleUrl: './restaurant-details.component.css'
})
export class RestaurantDetailsComponent implements OnInit {

  activeRoute = inject(ActivatedRoute)
  restService = inject(RestaurantServiceService)
  loader = inject(LoaderService)

  RestaurantDetails: any = []
  isAdmin: boolean = false;
  restaurantId: number = 0

  ngOnInit(): void {
    this.getDetails()
    this.checkAdminRole()
  }

  async checkAdminRole() {
    const user = getAuth().currentUser;

    // Check if user is authenticated and email is verified
    if (user && user.emailVerified) {
      if (user.email == "kaifk8402@gmail.com") {
        this.isAdmin = true
      }
    } else {
      console.log('User is either not logged in or email is not verified.');
    }
  }



  getDetails() {
    this.loader.showLoader()
    this.activeRoute.paramMap.subscribe(params => {
      this.restaurantId = +params.get('restaurentId')!
    })

    this.restService.restaurantDetails(this.restaurantId).subscribe((res: any) => {
      if (res) {
        this.RestaurantDetails = res
        this.loader.hideLoader()
      }
    }, err => {
      console.log("Error", err)
      this.loader.hideLoader()
    })
  }
}
