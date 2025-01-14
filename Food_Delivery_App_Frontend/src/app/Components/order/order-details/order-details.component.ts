import { Component, inject } from '@angular/core';
import { OrderService } from '../../../Services/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-details',
  imports: [CommonModule],
  templateUrl: './order-details.component.html',
  styleUrl: './order-details.component.css'
})
export class OrderDetailsComponent {

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

  DeliveryTime(timeObj: any): string {
    const time = new Date(timeObj);
    const localTime = new Date(time.getTime() - (time.getTimezoneOffset() * 60000));
    return localTime.toLocaleTimeString("en-US", { hour: '2-digit', minute: '2-digit', hour12: true });
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

}
