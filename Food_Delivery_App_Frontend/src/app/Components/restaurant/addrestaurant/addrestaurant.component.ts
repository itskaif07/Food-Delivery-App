import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-addrestaurant',
  imports: [RouterLink,ReactiveFormsModule],
  templateUrl: './addrestaurant.component.html',
  styleUrl: './addrestaurant.component.css'
})
export class AddrestaurantComponent implements OnInit {

  ngOnInit(): void {
    this.setFormState()
  }

fb = inject(FormBuilder)
restaurantForm:FormGroup = new FormGroup({});

setFormState(){
  this.restaurantForm = this.fb.group({
    id:[0],
    name:['', Validators.required],
    email:['', Validators.email],
    phone:['', Validators.required],
    address:['', Validators.required],
    description:[''],
    openinghour:[''],
    closinghour:[''],
    category:[''],
    image:['']
  })
}
}
