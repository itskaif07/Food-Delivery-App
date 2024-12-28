import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { LoaderService } from '../../../Shared/service/loader.service';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { MenuServiceService } from '../../../Services/menu-service.service';

@Component({
  selector: 'app-delete-menu',
  imports: [RouterLink],
  templateUrl: './delete-menu.component.html',
  styleUrl: './delete-menu.component.css'
})
export class DeleteMenuComponent implements OnInit {

  restaurentService = inject(RestaurantServiceService)
  menuService = inject(MenuServiceService)
  router = inject(Router)
  activeRoute = inject(ActivatedRoute)

  restaurent: any = []
  menuItem: any = []

  restaurentId: number = 0
  menuId: number = 0


  ngOnInit(): void {
    this.getParams()
    this.getRestaurentDetails()
    this.getMenuItemDetails()
  }

  getParams() {
    this.activeRoute.paramMap.subscribe(params => {
      this.restaurentId = +params.get('restaurentId')!
      this.menuId = +params.get('menuId')!
    })
  }

  getRestaurentDetails() {
    this.restaurentService.restaurantDetails(this.restaurentId).subscribe((res: any) => {
      if (res) {
        this.restaurent = res
      } else {
        console.log("restaurent not available")
      }
    }, err => {
      console.log(err)
    })

  }

  getMenuItemDetails() {
    this.menuService.menuDetails(this.menuId).subscribe((res: any) => {
      if (res) {
        this.menuItem = res
      }
      else {
        console.log('menu not available')
      }
    }, (err) => {
      console.log("error", err)
    })
  }



  delete() {
    this.menuService.deleteMenu(this.menuId).subscribe((res: any) => {
      this.router.navigate(['/menu-list', this.restaurentId])

    }, error => {
      console.log("Error", error)
    })
  }

}
