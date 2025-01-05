import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';

@Component({
  selector: 'app-add-order',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css'
})
export class AddOrderComponent implements OnInit {

  router = inject(Router)
  activeRoute = inject(ActivatedRoute)

  //Services
  authService = inject(AuthService)
  menuService = inject(MenuServiceService)

  //User properties

  name: string = ''
  username: string = ''
  phone: string = ''
  email: string = ''
  address: string = ''
  pincode: string = ''

  // other properties

  menuItemId: any = ''
  menuDetails: any = []
  currentQuantity:number = 1
  subTotal:number = 0
  Total:number = 0

  //form

  fb = inject(FormBuilder)
  orderForm: FormGroup = new FormGroup({})

  constructor() {
    this.orderForm = this.fb.group({
      name: [''],
      username: ['', Validators.required],
      address: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.email],
      pincode: ['', [Validators.minLength(6), Validators.maxLength(6)]],
      quantity: [1, [Validators.required, Validators.minLength(1)]]
    })
  }


  ngOnInit(): void {
    this.getuser()
    this.setFormState()
    this.getMenuDetails()
  }

  getuser() {
    const currentUser = this.authService.userSubject.value;
    if (currentUser) {
      console.log(currentUser)
      this.name = currentUser.fullName || ''
      this.username = currentUser.displayName
      this.address = currentUser.address || ''
      this.phone = currentUser.phone || ''
      this.email = currentUser.email
      this.pincode = currentUser.pincode
    }
    else {
      this.router.navigateByUrl('/log-in')
    }
  }

  setFormState() {
    this.orderForm = this.fb.group({
      name: [this.name],
      username: [this.username, Validators.required],
      address: [this.address, Validators.required],
      phone: [this.phone, Validators.required],
      email: [this.email, Validators.email],
      pincode: [this.pincode, [Validators.minLength(6), Validators.maxLength(6)]],
      quantity: [1, [Validators.required, Validators.minLength(1)]]
    })
  }

  getMenuDetails() {
    this.activeRoute.paramMap.subscribe(params => {
      this.menuItemId = +params.get('menuId')!
    })
    this.menuService.menuDetails(this.menuItemId).subscribe((res: any) => {
      if (res) {
        this.menuDetails = res
        this.subTotal = this.menuDetails.price - (this.menuDetails.price * this.menuDetails.discount / 100 )
        this.Total = this.subTotal * this.currentQuantity
      }
    }, error => {
      console.log("error fetching menu details", error)
    })
  }

  incrementQuantity(){
    this.currentQuantity = this.orderForm.value.quantity
    this.currentQuantity ++
    this.Total = this.subTotal * this.currentQuantity
    this.orderForm.patchValue({quantity: this.currentQuantity})
  }

  decrementQuantity(){
    this.currentQuantity = this.orderForm.value.quantity;
    if(this.currentQuantity > 1){
      this.currentQuantity --
      this.Total = this.subTotal * this.currentQuantity
      this.orderForm.patchValue({quantity: this.currentQuantity})
    }
  }


}
