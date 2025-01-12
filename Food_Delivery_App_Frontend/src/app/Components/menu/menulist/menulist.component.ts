import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../Shared/service/loader.service';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-menulist',
  imports: [RouterLink],
  templateUrl: './menulist.component.html',
  styleUrl: './menulist.component.css'
})
export class MenulistComponent implements OnInit {

  menuService = inject(MenuServiceService)
  activeRoute = inject(ActivatedRoute)
  loader = inject(LoaderService)
  restaurentService = inject(RestaurantServiceService)

  menuList: any[] = []
  restaurentId: number = 0;
  isAdmin:boolean = false

  restaurent: any = []

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      this.restaurentId = +params.get('restaurentId')!
    })

    this.checkAdminRole()
    this.getList()
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

  getList() {
    this.loader.showLoader()
    this.menuService.getAllMenu(this.restaurentId).subscribe((res: any) => {
      this.menuList = res
      this.loader.hideLoader()
    }, err => {
      console.log("error", err)
    })
  }

  // getRestaurentDetails() {
  //   this.loader.showLoader()
  //   this.restaurentService.restaurantDetails(this.restaurentId).subscribe((res: any) => {
  //     if (res) {
  //       this.restaurent = res
  //       this.loader.hideLoader()
  //     } else {
  //       console.log("restaurent not available")
  //       this.loader.hideLoader()
  //     }
  //   }, err => {
  //     console.log(err)
  //     this.loader.hideLoader()
  //   })

  // }







}
