import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { LoaderService } from '../../service/loader.service';
import { delay, finalize, Subscription } from 'rxjs';

@Component({
  selector: 'app-loader',
  imports: [CommonModule],
  templateUrl: './loader.component.html',
  styleUrl: './loader.component.css'
})
export class LoaderComponent implements OnInit, OnDestroy {

  http = inject(HttpClient)
  loaderService = inject(LoaderService)
  private loaderSubscription: Subscription = new Subscription();

  private baseUrl = 'https://localhost:7205/api/Restaurant';

  ngOnInit(): void {
    this.loaderService.loader$.subscribe((state) => {
    });
  
    this.loadData();
  }
  

  loadData() {
    this.loaderService.showLoader();
  
    this.http.get(this.baseUrl)
      .pipe(finalize(() => {
        this.loaderService.hideLoader();
      }))
      .subscribe(
        (res: any) => {
        },
        (err) => {
          console.log('API Error:', err);
        }
      );
  }
  

  ngOnDestroy(): void {
      if(this.loaderSubscription){
        this.loaderSubscription.unsubscribe();
      }
  }
}
