import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuServiceService {

  constructor(private http: HttpClient){}

  apiUrl:string = 'https://localhost:7205/api/Menu'

  getAllMenu():Observable<any>{
    return this.http.get(this.apiUrl)
  }

  addMenu(obj:any):Observable<any>{
    return this.http.post(this.apiUrl, obj);
  }

  editMenu(id:number, obj:any):Observable<any>{
    return this.http.put(`${this.apiUrl}/${id}`, obj)
  }

  deleteMenu(id:number){
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
