import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { getAuth } from 'firebase/auth';
import { CartService } from '../../../Services/cart.service';
import { LoaderService } from '../../../Shared/service/loader.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu-details',
  imports: [RouterLink, CommonModule],
  templateUrl: './menu-details.component.html',
  styleUrl: './menu-details.component.css'
})
export class MenuDetailsComponent implements OnInit {

  menuId: number = 0
  restaurentId: number = 0
  userId:string =''
  deliveryTime = ''
  deliveryCharge = 0;
  isAdmin: boolean = false
  activeRoute = inject(ActivatedRoute)
  menuService = inject(MenuServiceService)
  cartService = inject(CartService)
  authService = inject(AuthService)
  router = inject(Router)
  loader = inject(LoaderService)
  fb = inject(FormBuilder);
  cartForm:FormGroup = new FormGroup({})

  menu: any = []

  constructor(){
    this.cartForm = this.fb.group({
      userId: [''], 
      restaurentId: [0], 
      menuItemId: [0],
      price: [0],
      quantity: [1] 
    });
  }

  ngOnInit(): void {
    this.getMenu();
    this.checkAdminRole()
    this.getUser()
    this.getDeliveryTime()
  }

  // Menu list

  getMenu() {

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

  // admin role

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

  // Edit Delete

  RedirectToDelete() {
    this.router.navigate(['/delete-menu', this.restaurentId, this.menuId])
  }

  RedirectToEdit() {
    this.router.navigate(['/edit-menu', this.restaurentId, this.menuId])
  }

  // Cart add

  getUser() {
    const user = this.authService.userSubject.value;
    if (!user || !user.uid) {
      this.router.navigateByUrl('/log-in');
    } else {
      this.userId = user.uid;
    }
  }
  
  AddCart() {
    this.loader.showLoader();

    if (!this.userId) {
      console.error('User ID is not available');
      this.loader.hideLoader();
      return;
    }
  
    const cartData = {
      userId: this.userId,
      restaurentId: this.restaurentId,
      menuItemId: this.menuId,
      price: this.menu.price
    };
  
  
    this.cartService.addCart(cartData).subscribe(
      (res: any) => {
        this.router.navigateByUrl('/cart-list');
        this.loader.hideLoader();
      },
      error => {
        console.error('Error adding to cart:', error);
        this.loader.hideLoader();
      }
    );
  }


getDeliveryTime(){
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30)
   this.deliveryTime = now.toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', hourCycle:"h12"})
  }

  redirectOrder(){
    this.router.navigate(['add-order', this.menuId, this.restaurentId])
  }
  
}

