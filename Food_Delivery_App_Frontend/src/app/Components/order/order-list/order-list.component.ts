import { Component, inject, OnInit } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order-list',
  imports: [RouterLink],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.css'
})
export class OrderListComponent implements OnInit {

  orderService = inject(OrderService)
  authService = inject(AuthService)
  router = inject(Router)

  uid: string = ``
  orderList: any[] = []

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
    this.orderService.getOrderList(this.uid).subscribe((res: any) => {
      this.orderList = res
      console.log(this.orderList)
    }, (error) => {
      console.log("Some error happened", error)
    })
  }

}
