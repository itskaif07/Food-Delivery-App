import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Cart } from '../Models/cart';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  http = inject(HttpClient)

  apiUrl:string = `https://localhost:7205/api/Carts`

  getCartList(userId:string){
    return this.http.get(`${this.apiUrl}/${userId}`)
  }

  addCart(cartData: any) {
    const params = new HttpParams()
      .set('userId', cartData.userId)
      .set('restaurentId', cartData.restaurentId.toString())
      .set('menuItemId', cartData.menuItemId.toString())
      .set('price', cartData.price.toString());
  
    return this.http.post(this.apiUrl, null, { params });
  }
  
  removeCart(cartId:number){
    return this.http.delete(`${this.apiUrl}/${cartId}`)
  }

  increaseQuantity(cartId:number){
    return this.http.put(`${this.apiUrl}/increase/${cartId}`, null)
  }

  decreaseQuantity(cartId:number){
    return this.http.put(`${this.apiUrl}/decrease/${cartId}`, null)
  }
  
}
