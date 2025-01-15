import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { LoaderService } from '../../../Shared/service/loader.service';

@Component({
  selector: 'app-order-list',
  imports: [RouterLink],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

  orderService = inject(OrderService)
  authService = inject(AuthService)
  menuService = inject(MenuServiceService)
  loaderService = inject(LoaderService)
  router = inject(Router)

  uid: string = ``
  orderList: any[] = []
  deliveryTime: any = ''
  TotalItems: number = 0
  totalAmount: number = 0
  totalQuantity: number = 0

  ngOnInit(): void {
    this.getUser()

  }

  getUser() {
    const currentUser = this.authService.userSubject.value;
    if (currentUser) {
      this.uid = currentUser.uid
      this.getOrderList()
    }
    else {
      this.router.navigateByUrl('/log-in')
    }
  }

  getOrderList() {
    this.loaderService.showLoader()
    this.orderService.getOrderList(this.uid).subscribe((res: any) => {
      this.orderList = res
      this.TotalItems = this.orderList.length;
      this.loaderService.hideLoader()
      this.calTotalAmount()
      console.log(this.orderList)
    }, (error) => {
      this.loaderService.hideLoader()
      console.log("Some error happened", error)
    })
  }


  DeliveryTime(timeObj: any): string {
    const time = new Date(timeObj);
    const localTime = new Date(time.getTime() - (time.getTimezoneOffset() * 60000));
    return localTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
  }

  calTotalAmount() {
    this.totalAmount = this.orderList.reduce((accumulator, item) => {
      return accumulator + (item.price * item.quantity)
    }, 0)

    this.totalQuantity = this.orderList.reduce((sum, item) => sum + item.quantity, 0)
  }



}
