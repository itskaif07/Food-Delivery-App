import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(private http: HttpClient){}

  apiUrl:string = 'https://localhost:7205/api/Menu'

  getAllMenu(id:number):Observable<any>{
    return this.http.get(`${this.apiUrl}/${id}`)
  }

  addMenu(obj:any):Observable<any>{
    return this.http.post(this.apiUrl, obj);
  }

  uploadImage(file: any): Observable<any> {
    const formData = new FormData();

    formData.append('file', file, file.name);
  
    return this.http.post(`${this.apiUrl}/UploadImage`, formData);
  }
  
  menuDetails(id:number){
    return this.http.get(`${this.apiUrl}/menu/${id}`)
  }
  

  editMenu(id:number, obj:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, obj)
  }

  deleteMenu(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
