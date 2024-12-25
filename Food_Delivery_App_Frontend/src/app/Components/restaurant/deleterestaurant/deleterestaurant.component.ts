import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';

@Component({
  selector: 'app-deleterestaurant',
  imports: [RouterLink],
  templateUrl: './deleterestaurant.component.html',
  styleUrl: './deleterestaurant.component.css'
})
export class DeleterestaurantComponent implements OnInit {

activeRoute = inject(ActivatedRoute)
restService = inject(RestaurantServiceService)
route = inject(Router)

restaurentId:number = 0
restaurant:any = []

ngOnInit(): void {
  this.activeRoute.paramMap.subscribe(params => {
    const id = params.get('restaurentId');
    if (id) {
      this.restaurentId = +id;  // Ensure it's a number
      console.log('Restaurant ID:', this.restaurentId);
    } else {
      console.log('Restaurant ID is missing');
    }
  });
}



delete(): void {
  if (this.restaurentId) {
    this.restService.deleteRestaurant(this.restaurentId).subscribe(
      (res: any) => {
        
       this.route.navigate(['restaurants-list'])
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  } else {
    console.log('Invalid restaurant ID');
  }
}
}

