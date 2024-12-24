import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';

@Component({
  selector: 'app-add-menu',
  imports: [RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent implements OnInit {

  menuForm:FormGroup = new FormGroup({});

  fb = inject(FormBuilder);
  menuService = inject(MenuServiceService)
  router = inject(Router)
  activeRoute = inject(ActivatedRoute)
  restaurantId:number = 0;

  
  ngOnInit(): void {
    
    this.activeRoute.queryParams.subscribe(params =>{
      this.restaurantId = +params['restaurantId']
      console.log(this.restaurantId)
    })

    this.setFormState()
  }

  setFormState(){
    this.menuForm = this.fb.group({
      menuId: [0], 
      name: ['', Validators.required], 
      description: [''], 
      price: ['', [Validators.required, Validators.min(0)]], 
      imageUrl: [''], 
      category: ['', Validators.required], 
      isAvailable: [false], 
      restaurantId: [0, Validators.required],
    });
    
  }

  onSubmit(obj: any) {

    obj.restaurantId = this.restaurantId

    this.menuService.addMenu(obj).subscribe(
      () => {
        this.router.navigate(['/menu-list']);
      },
      (err) => {
        console.log('Error:', err);
      }
    );
  }
  

}
