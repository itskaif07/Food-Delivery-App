import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoaderService } from '../../../Shared/service/loader.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MenuServiceService } from '../../../Services/menu-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-menu',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterLink],
  templateUrl: './edit-menu.component.html',
  styleUrl: './edit-menu.component.css'
})
export class EditMenuComponent {

  @ViewChild('fileInput') fileInput: ElementRef<HTMLInputElement> | undefined;
  menuForm: FormGroup = new FormGroup({});

  fb = inject(FormBuilder);
  menuService = inject(MenuServiceService)
  router = inject(Router)
  activeRoute = inject(ActivatedRoute)
  loader = inject(LoaderService)
  restaurentId: number = 0;
  menuId: number = 0;
  uploadedImage: string = ''
  menuData: any = []

  constructor() {
    this.setInitialFormState()
  }


  ngOnInit(): void {

    this.getParams()
    console.log(this.restaurentId)
    console.log(this.menuId)
    this.getMenuItemDetails()
  }

  getParams() {
    this.activeRoute.paramMap.subscribe(params => {
      this.restaurentId = +params.get('restaurentId')!
      this.menuId = +params.get('menuId')!
    })
  }

  setInitialFormState() {
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

  triggerInput() {
    if (this.fileInput && this.fileInput.nativeElement) {
      this.fileInput?.nativeElement.click()
    }
  }

  onFileChange(event: any) {

    const file = event.target.files[0]

    if (file) {
      this.uploadedImage = URL.createObjectURL(file)

      this.menuService.uploadImage(file).subscribe((res: any) => {
        if (res && res.imageUrl) {
          console.log('Image uploaded successfully:', res.imageUrl);
          this.uploadedImage = res.imageUrl;
        }
        console.log('image uploaded')
      }, (err) => {
        console.log('error', err)
      })
    }
  }

  getMenuItemDetails() {
    this.menuService.menuDetails(this.menuId).subscribe((res: any) => {
      if (res) {
        this.menuData = res
        this.setFormState()
      }
      else {
        console.log('response not available')
      }
    }, err => {
      console.log('error', err)
    })
  }

  setFormState() {
    this.menuForm.patchValue({
      restaurentId: this.menuData.restaurentId || 0,
      name: this.menuData.name || '',
      description: this.menuData.description || '',
      price: this.menuData.price || '',
      imageUrl: this.menuData.imageUrl || '',
      category: this.menuData.category || '',
      isAvailable: this.menuData.isAvailable || false,
    })
  }


  onSubmit() {

    this.menuForm.value.imageUrl = this.uploadedImage

    this.menuService.editMenu(this.menuId, this.menuForm.value).subscribe((res: any) => {
      this.router.navigate(['/menu-list', this.restaurentId])
    },
      (err) => {
        console.log(err)
      })

  }

}
