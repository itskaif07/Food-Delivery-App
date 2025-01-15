import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  http = inject(HttpClient)

  apiUrl = `https://localhost:7205/api/Home`


  getSearchedList(query:string): Observable<any>{
   return this.http.get(`${this.apiUrl}?searchQuery=${query}`)
  }
}
