import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Shared/service/loader.service';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  authService = inject(AuthService)
  formBuilder = inject(FormBuilder)
  router = inject(Router)
  loader = inject(LoaderService)
  signUpForm: FormGroup = new FormGroup({})

  ngOnInit(): void {
    this.setFormState()
  }

  setFormState() {
    this.signUpForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6)]],
      address: [''],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$'),]],
    })
  }

  onSubmit() {
    const rawForm = this.signUpForm.getRawValue();

    this.loader.showLoader()
    this.authService.signUp(rawForm.email, rawForm.password, rawForm.username, rawForm.phone, rawForm.address, rawForm.pincode).subscribe((next) => {
      this.router.navigateByUrl('/')
      this.loader.hideLoader()
    }, err => {
      console.log('Some error occurred during signup', err);
      this.loader.hideLoader()
    })
  }


}
