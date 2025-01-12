import { Component, Inject, inject, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { LoaderService } from '../../../Shared/service/loader.service';
import { getAuth } from 'firebase/auth';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-restaurantslist',
  imports: [RouterLink, RouterOutlet, CommonModule],
  templateUrl: './restaurantslist.component.html',
  styleUrl: './restaurantslist.component.css'
})
export class RestaurantslistComponent implements OnInit {

  restaurantsList: any[] = [];
  isAdmin: boolean = false

  loader = inject(LoaderService)

  constructor(private restService: RestaurantServiceService) { }

  ngOnInit(): void {
    this.loader.showLoader()
    this.restService.getAllRestaurants().subscribe((res: any) => {
      this.loader.hideLoader()
      this.restaurantsList = res
    }, (err) => {
      console.log("Error", err)
      this.loader.hideLoader()
    })
    this.checkAdminRole()
  }

  async checkAdminRole() {
    const user = getAuth().currentUser;

    if (user && user.emailVerified) {
      if (user.email == "kaifk8402@gmail.com") {
        this.isAdmin = true
      }
    } else {
      console.log('User is either not logged in or email is not verified.');
    }
  }

}
