import { Component, inject } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { AuthService } from '../../../Services/auth.service';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-delete-order',
  imports: [RouterLink],
  templateUrl: './delete-order.component.html',
  styleUrl: './delete-order.component.css'
})
export class DeleteOrderComponent {

    orderService = inject(OrderService)
    router = inject(Router)
    activatedRoute = inject(ActivatedRoute)
  
    orderId:number = 0
    OrderDetails: any = []
  
    ngOnInit(): void {
      this.getOrderId()
      this.getOrderDetails()
    }

    getOrderId(){
      this.activatedRoute.paramMap.subscribe(params =>{
        this.orderId = +params.get('orderId')!
      })
    }
  
  
    getOrderDetails(){
      this.orderService.orderDetails(this.orderId).subscribe((res:any)=>{
        if(res){
          this.OrderDetails = res;
        }
      }, error =>{
        console.log("error fetching details", error)
      })
    }


    cancelOrder(){
      this.orderService.deleteOrder(this.orderId).subscribe((res:any)=>{
        console.log('deleted')
        this.router.navigateByUrl('/order-list')
      }, error =>{
        console.log("error deleting order", error)
      })
    }

}
