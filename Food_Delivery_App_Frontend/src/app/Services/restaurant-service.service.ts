import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestaurantServiceService {

  constructor(private http: HttpClient) {}
  
  apiUrl:string = "https://localhost:7205/api/Restaurant";

  getAllRestaurants(){
    return this.http.get(this.apiUrl)
  }

  addRestaurant(obj:any){
   return this.http.post(this.apiUrl, obj)
  }

  uploadImage(imageFile: any) {
    const formData = new FormData();
    formData.append('file', imageFile, imageFile.name);

    return this.http.post(`${this.apiUrl}/UploadImage`, formData);
  }
  
  restaurantDetails(id:number){
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  editRestaurant(id:number, obj:any){
    return this.http.put(`${this.apiUrl}/${id}`, obj)
  }

  deleteRestaurant(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
