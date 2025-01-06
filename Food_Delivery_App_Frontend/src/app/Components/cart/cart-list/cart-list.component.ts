import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../Services/cart.service';
import { AuthService } from '../../../Services/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { LoaderService } from '../../../Shared/service/loader.service';
import { OrderService } from '../../../Services/order.service';

@Component({
  selector: 'app-cart-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart-list.component.html',
  styleUrl: './cart-list.component.css'
})
export class CartListComponent implements OnInit {

  cartService = inject(CartService)
  authService = inject(AuthService)
  orderService = inject(OrderService)
  loader = inject(LoaderService)
  router = inject(Router)
  menuService = inject(MenuServiceService)
  menuIds: number[] = []
  cartList: any = []
  menuItemList: any = []
  cartItemsWithMenu: any[] = [];

  userId: string = ''
  name: string = ''
  username: string = ''
  phone: string = ''
  email: string = ''
  address: string = ''
  pincode: string = ''

  ngOnInit(): void {
    this.getuser()

  }

  getuser() {
    const currentUser = this.authService.userSubject.value;
    if (currentUser) {
      this.userId = currentUser.uid
      this.name = currentUser.fullName || ''
      this.username = currentUser.displayName
      this.address = currentUser.address || ''
      this.phone = currentUser.phone || ''
      this.email = currentUser.email
      this.pincode = currentUser.pincode
      console.log(currentUser)
      this.CartList()
    }
    else {
      this.router.navigateByUrl('/log-in')
    }
  }

  CartList() {
    this.loader.showLoader()
    this.cartService.getCartList(this.userId).subscribe((res: any) => {
      this.cartList = res;
      this.menuIds = this.cartList.map((item: { menuItemId: any; }) => item.menuItemId);

      if (this.menuIds.length > 0) {
        this.getMenuItem()
      }
      else {
        console.log("No menuIds found.");
      }
      this.loader.hideLoader()
    }, error => {
      console.log("error", error)
      this.loader.hideLoader()
    })
  }

  getMenuItem() {
    this.loader.showLoader()
    const url = `https://localhost:7205/api/Menu/MenuListDetails?${this.menuIds.map(id => `menuId=${id}`).join('&')}`;

    this.menuService.menuItemList(url).subscribe((res: any) => {
      this.menuItemList = res;
      this.cartItemsWithMenu = this.cartList.map((cartItem: any) => {
        const menuItem = this.menuItemList.find((item: any) => item.menuId === cartItem.menuItemId);
        return { ...cartItem, menuItem }
      })
      this.loader.hideLoader()
    }, error => {
      console.log("error", error)
      this.loader.hideLoader()
    })
  }

  removeCart(cartId: number) {
    this.loader.showLoader()
    this.cartService.removeCart(cartId).subscribe((res: any) => {

      this.cartItemsWithMenu = this.cartItemsWithMenu.filter(item => item.id !== cartId)

      this.loader.hideLoader()
    }, error => {
      console.log('Some error happened', error)
      this.loader.hideLoader()
    })
  }

  increaseQuantity(cartId: number) {
    this.loader.showLoader()
    this.cartService.increaseQuantity(cartId).subscribe((res: any) => {

      const item = this.cartItemsWithMenu.find(item => item.id === cartId)
      if (item) {
        item.quantity++
      }
      this.loader.hideLoader()

    }, error => {
      console.log("some error occured", error)
      this.loader.hideLoader()
    })
  }

  decreaseQuantity(cartId: number) {
    this.loader.showLoader()
    this.cartService.decreaseQuantity(cartId).subscribe((res: any) => {

      const item = this.cartItemsWithMenu.find(item => item.id === cartId)

      if (item && item.quantity > 1) {
        item.quantity--
      }
      else {
        this.cartItemsWithMenu = this.cartItemsWithMenu.filter(item => item.id !== cartId)
      }

      this.loader.hideLoader()
    }, error => {
      console.log("some error occured", error)
      this.loader.hideLoader()
    })
  }

}
