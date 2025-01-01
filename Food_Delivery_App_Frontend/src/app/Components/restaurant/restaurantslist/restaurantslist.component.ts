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
    const user = getAuth().currentUser

    if (user) {
      const idToken = await user.getIdTokenResult()
      const claims = idToken.claims as any;
      this.isAdmin = claims['admin'] ? true : false
    }
  }


}
