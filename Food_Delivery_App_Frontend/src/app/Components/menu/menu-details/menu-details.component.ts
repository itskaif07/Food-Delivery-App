import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';

@Component({
  selector: 'app-menu-details',
  imports: [RouterLink],
  templateUrl: './menu-details.component.html',
  styleUrl: './menu-details.component.css'
})
export class MenuDetailsComponent implements OnInit {

  menuId: number = 0
  restaurentId: number = 0
  activeRoute = inject(ActivatedRoute)
  menuService = inject(MenuServiceService)
  router = inject(Router)

  menu: any = []

  ngOnInit(): void {

    this.getMenu();
  }

  getMenu() {
    // Extract parameters in one subscription
    this.activeRoute.paramMap.subscribe(params => {
      this.menuId = +params.get('menuId')!;
      this.restaurentId = +params.get('restaurentId')!;

      // Fetch menu details
      this.menuService.menuDetails(this.menuId).subscribe(
        (res: any) => {
          if (res) {
            this.menu = res;
          } else {
            console.log("Menu not found");
          }
        },
        err => {
          console.log("Error fetching menu details:", err);
        }
      );
    });
  }

  RedirectToDelete() {
    this.router.navigate(['/delete-menu', this.restaurentId, this.menuId])
  }

  RedirectToEdit() {
    this.router.navigate(['/edit-menu', this.restaurentId, this.menuId])
  }

}

