import { Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Shared/service/loader.service';
import { getAuth } from 'firebase/auth';

@Component({
  selector: 'app-addrestaurant',
  imports: [RouterLink, ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './addrestaurant.component.html',
  styleUrl: './addrestaurant.component.css'
})
export class AddrestaurantComponent implements OnInit {

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  ngOnInit(): void {
    this.setFormState()
    this.checkAdminRole()
  }

loader = inject(LoaderService)

  imageUpload: string = '';
  isAdmin:boolean = false;

  route = inject(ActivatedRoute);
  router = inject(Router)

  restService = inject(RestaurantServiceService)

  fb = inject(FormBuilder)
  restaurantForm: FormGroup = new FormGroup({});

  setFormState() {
    this.restaurantForm = this.fb.group({
      restaurentId: [0],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', Validators.email],
      phoneNumber: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(10)]],
      address: ['', Validators.required],
      description: ['',Validators.maxLength(300)],
      openTime: ['09:00:00', Validators.required],
      closeTime: ['22:00:00', Validators.required],
      category: [''],
      imageUrl: ['']
    });
  }

 async checkAdminRole(){
    const user = getAuth().currentUser

    if(user){
      const idToken = await user.getIdTokenResult()
      const claims = idToken.claims as any;
      this.isAdmin = claims['admin'] ? true : false
    }
  }


  onSubmit(obj: any) {
    
    if (this.restaurantForm.valid) {
      // Ensure the image has been uploaded
      if (!this.imageUpload) {
        console.log('Image is required');
        return;
      }
  
      // Set the image URL in the form and object
      obj.imageUrl = this.imageUpload;
  
      // Patch the form with the updated image URL
      this.restaurantForm.patchValue({
        imageUrl: this.imageUpload
      });
  
      // Submit the form data to the backend
      this.restService.addRestaurant(obj).subscribe(
        (restaurant: any) => {
          const restaurantId = restaurant.restaurentId;
          this.router.navigate(['/add-menu'], { queryParams: { restaurantId } });
        },
        (err: any) => {
          console.error('Error adding restaurant:', err);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  

  triggerFileInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput.nativeElement.click();
    }
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Update preview URL
      this.imageUpload = URL.createObjectURL(file);

      // Upload the image
      this.restService.uploadImage(file).subscribe(
        (res: any) => {
          if (res && res.imageUrl) {
            this.imageUpload = res.imageUrl; 
          }
          console.log('Uploaded');
        },
        (err) => {
          console.log('Error uploading image', err);
        }
      );
    }
  }

}
