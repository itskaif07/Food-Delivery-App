import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient)

  apiUrl:string = `https://localhost:7205/api/Orders`

  getOrderList(userId:string): Observable<any>{
    return this.http.get(`${this.apiUrl}?userId=${userId}`)
  }

  addOrder(obj:any): Observable<any>{
    return this.http.post(this.apiUrl, obj)
  }

  orderDetails(id:number): Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  deleteOrder(id:number): Observable<any>{
    return this.http.delete(`${this.apiUrl}?orderId=${id}`)
  }


}
