import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-addrestaurant',
  imports: [RouterLink,ReactiveFormsModule, CommonModule],
  templateUrl: './addrestaurant.component.html',
  styleUrl: './addrestaurant.component.css'
})
export class AddrestaurantComponent implements OnInit {

  ngOnInit(): void {
    this.setFormState()
  }

route = inject(ActivatedRoute);
router = inject(Router)  

restService = inject(RestaurantServiceService)

fb = inject(FormBuilder)
restaurantForm:FormGroup = new FormGroup({});

setFormState(){
  this.restaurantForm = this.fb.group({
    restaurentId: [0], 
    name: ['', Validators.required],
    email: ['', Validators.email],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required],
    description: [''],
    openTime: ['09:00:00', Validators.required],
    closeTime: ['22:00:00', Validators.required], 
    category: [''],
    imageUrl: [''] 
  });
}


  onSubmit(obj:any){
    if(this.restaurantForm.valid){

      this.restService.addRestaurant(obj).subscribe((restaurant:any)=>{
        const restaurantId = restaurant.restaurentId
        this.router.navigate(['/add-menu'], {queryParams: {restaurantId}})
      }, (err:any) =>{
        console.error('Error adding restaurant:', err);
      })
      
    }
    else{
      console.log("form is invalid")
    }

  }
}
