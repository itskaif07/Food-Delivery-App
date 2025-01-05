import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  http = inject(HttpClient)

  apiUrl:string = `https://localhost:7205/api/Orders`

  getOrderList(userId:string){
    return this.http.get(`${this.apiUrl}?userId=${userId}`)
  }
}
