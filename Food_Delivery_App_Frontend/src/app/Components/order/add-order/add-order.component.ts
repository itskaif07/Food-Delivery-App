import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { OrderService } from '../../../Services/order.service';
import { CartService } from '../../../Services/cart.service';

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
  orderService = inject(OrderService)
  cartService = inject(CartService)

  //User properties

  uid: string = ''
  name: string = ''
  username: string = ''
  phone: string = ''
  email: string = ''
  address: string = ''
  pincode: string = ''

  // other properties

  menuItemId: any = ''
  restaurentId: any = ''
  menuDetails: any = []
  currentQuantity: number = 1
  subTotal: number = 0
  Total: number = 0
  deliveryTime: any = ''
  paramQuantity: number = 0
  cartId: number = 0

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
    this.getParams()
    this.getCartData()
    this.setFormState()
    console.log('Route params:', this.activeRoute.snapshot.params);
    this.getMenuDetails()
    this.getDeliveryTime()
  }

  getuser() {
    const currentUser = this.authService.userSubject.value;
    if (currentUser) {
      this.uid = currentUser.uid
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
      phone: [this.phone, [Validators.required, Validators.pattern('^[0-9]{6}$')]],
      email: [this.email, Validators.email],
      pincode: [this.pincode, Validators.pattern('^[0-9]{6}$')],
      quantity: [this.currentQuantity, [Validators.required, Validators.minLength(1)]]
    })
  }

  getParams() {
    this.activeRoute.paramMap.subscribe(params => {
      console.log("Full route params (paramMap):", params);  // Logs all route params
      this.menuItemId = +params.get('menuId')!;
      this.restaurentId = +params.get('restaurentId')!
    });
  }

  getCartData() {
    this.activeRoute.paramMap.subscribe(params => {
      const quantity = params.get('quantity?');
      this.paramQuantity = quantity ? +quantity : 1;
      this.currentQuantity = this.paramQuantity
      const cartIdParam = params.get('cartId?');
      this.cartId = cartIdParam ? +cartIdParam : 1
      console.log(this.cartId)
    });
  }


  getDeliveryTime() {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30)
    this.deliveryTime = now.toISOString();
  }

  getMenuDetails() {
    this.menuService.menuDetails(this.menuItemId).subscribe((res: any) => {
      if (res) {
        this.menuDetails = res
        this.subTotal = this.menuDetails.price - (this.menuDetails.price * this.menuDetails.discount / 100)
        this.Total = this.subTotal * this.currentQuantity
      }
    }, error => {
      console.log("error fetching menu details", error)
    })
  }

  incrementQuantity() {
    this.currentQuantity = this.orderForm.value.quantity
    this.currentQuantity++
    this.Total = this.subTotal * this.currentQuantity
    this.orderForm.patchValue({ quantity: this.currentQuantity })
  }

  decrementQuantity() {
    this.currentQuantity = this.orderForm.value.quantity;
    if (this.currentQuantity > 1) {
      this.currentQuantity--
      this.Total = this.subTotal * this.currentQuantity
      this.orderForm.patchValue({ quantity: this.currentQuantity })
    }
  }

  onSubmit() {
    const orderObj = {
      userId: this.uid,
      menuItemId: this.menuItemId,
      restaurentId: this.restaurentId,
      price: this.menuDetails.price,
      itemImage: this.menuDetails.imageUrl,
      itemName: this.menuDetails.name,
      deliveryTime: this.deliveryTime,
      quantity: this.orderForm.value.quantity,
      username: this.orderForm.value.username,
      fullName: this.orderForm.value.name,
      email: this.orderForm.value.email,
      phoneNumber: this.orderForm.value.phone,
      Address: this.orderForm.value.address,
      Pincode: this.orderForm.value.pincode,
    }

    this.orderService.addOrder(orderObj).subscribe((res: any) => {
      if (this.cartId) {
        this.cartService.removeCart(this.cartId).subscribe((res: any) => {
        }, error => {
          console.log('error deleting cart', error)
        })
      }
      this.router.navigateByUrl('/order-list')
    }, error => {
      console.log(error)
    })
  }

}
