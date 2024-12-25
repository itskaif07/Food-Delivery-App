import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RestaurantServiceService } from '../../../Services/restaurant-service.service';

@Component({
  selector: 'app-editrestaurant',
  imports: [ReactiveFormsModule, CommonModule, FormsModule, RouterLink],
  templateUrl: './editrestaurant.component.html',
  styleUrl: './editrestaurant.component.css'
})
export class EditrestaurantComponent implements OnInit {


  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;

  restaurentId: number = 0
  imageUpload: string = '';
  restaurantData: any = []

  constructor() {
    this.restaurantForm = this.fb.group({
      restaurentId: [0],
      name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', Validators.email],
      phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      address: ['', Validators.required],
      description: ['', Validators.maxLength(300)],
      openTime: ['', Validators.required],
      closeTime: ['', Validators.required],
      category: [''],
      imageUrl: ['']
    });
  }



  ngOnInit(): void {
    this.getData()
  }

  getData() {
    this.Activeroute.paramMap.subscribe((params) => {
      this.restaurentId = +params.get('restaurentId')!;
      this.restService.restaurantDetails(this.restaurentId).subscribe(
        (res: any) => {
          this.restaurantData = res;

          if (this.restaurantData) {
            this.setFormState();
          }
        },
        (err) => {
          console.error('Failed to fetch restaurant details:', err);
        }
      );
    });
  }




  Activeroute = inject(ActivatedRoute);
  router = inject(Router)
  cdr = inject(ChangeDetectorRef)

  restService = inject(RestaurantServiceService)

  fb = inject(FormBuilder)
  restaurantForm: FormGroup = new FormGroup({});


  setFormState() {
    this.restaurantForm.patchValue({
      restaurentId: this.restaurantData.restaurentId || 0,
      name: this.restaurantData.name || '',
      email: this.restaurantData.email || '',
      phoneNumber: this.restaurantData.phoneNumber || '',
      address: this.restaurantData.address || '',
      description: this.restaurantData.description || '',
      openTime: this.restaurantData.openTime || '',
      closeTime: this.restaurantData.closeTime || '',
      category: this.restaurantData.category || '',
      imageUrl: this.restaurantData.imageUrl || ''
    });

    // Set the imageUpload for UI display
    this.imageUpload = this.restaurantData.imageUrl || '';
  }




  onSubmit(id: number, obj: any) {
    if (this.restaurantForm.valid) {
      console.log('Form values:', this.restaurantForm.value); // Check the form data before submit
  
      if (!this.imageUpload) {
        return;
      }
  
      obj.imageUrl = this.imageUpload; // Ensure that the final image URL is set here
      this.restaurantForm.patchValue({
        imageUrl: this.imageUpload
      });
  
      this.restService.editRestaurant(id, obj).subscribe(() => {
        this.router.navigate(['/restaurants-list']);
      },
      (err: any) => {
        console.error('Error adding restaurant:', err);
      });
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
      // Show local preview
      this.imageUpload = URL.createObjectURL(file);

      // Upload to API
      this.restService.uploadImage(file).subscribe(
        (res: any) => {
          if (res && res.imageUrl) {
            this.imageUpload = res.imageUrl;

          // Directly update imageUrl in the restaurantData object
             this.restaurantData.imageUrl = res.imageUrl;

            console.log('Image uploaded:', res.imageUrl);
          }
          this.cdr.detectChanges();
        },
        (err) => {
          console.error('Upload failed:', err);
        }
      );
    }
  }

}
