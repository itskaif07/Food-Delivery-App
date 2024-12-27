import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, ViewChild, viewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { LoaderService } from '../../../Shared/service/loader.service';

@Component({
  selector: 'app-add-menu',
  imports: [RouterLink, CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './add-menu.component.html',
  styleUrl: './add-menu.component.css'
})
export class AddMenuComponent implements OnInit {

  @ViewChild('fileInput') fileInput : ElementRef<HTMLInputElement> | undefined;
  menuForm:FormGroup = new FormGroup({});

  fb = inject(FormBuilder);
  menuService = inject(MenuServiceService)
  router = inject(Router)
  activeRoute = inject(ActivatedRoute)
  loader = inject(LoaderService)
  restaurentId:number = 0;
  uploadedImage:string = ''

  
  ngOnInit(): void {

    this.getRestaurantId()
    console.log(this.restaurentId)
    this.setFormState()
  }

  getRestaurantId(){
    this.activeRoute.paramMap.subscribe(params =>{
      this.restaurentId = +params.get('restaurentId')!
    })
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
      restaurentId: [0],
    });
    
  }

  triggerInput(){
    if(this.fileInput && this.fileInput.nativeElement){
      this.fileInput?.nativeElement.click()
    }
  }

  onFileChange(event:any){

    const file = event.target.files[0]

   if(file){
    this.uploadedImage = URL.createObjectURL(file)

    this.menuService.uploadImage(file).subscribe((res:any)=>{
      if(res && res.imageUrl){
        console.log('Image uploaded successfully:', res.imageUrl);
        this.uploadedImage = res.imageUrl;
      }
      console.log('image uploaded')
    }, (err)=>{
      console.log('error', err)
    })
   }
  }

  onSubmit(obj: any) {

    this.menuForm.patchValue({restaurentId: this.restaurentId})
    this.menuForm.patchValue({imageUrl : this.uploadedImage})

    obj.imageUrl = this.uploadedImage

    this.menuService.addMenu(this.menuForm.value).subscribe((res: any) => {
      if (res) {
        this.router.navigate(['/restaurants-list']);
      } else {
        console.log('not saved');
      }
    }, err => {
      console.log("error", err);
    });
    
  }
  
}
