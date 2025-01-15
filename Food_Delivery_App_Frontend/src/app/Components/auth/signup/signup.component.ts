import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../../Services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Shared/service/loader.service';
import { finalize } from 'rxjs';
import { Auth, FacebookAuthProvider, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent implements OnInit {

  authService = inject(AuthService)
  formBuilder = inject(FormBuilder)
  auth = inject(Auth)
  router = inject(Router)
  loader = inject(LoaderService)
  signUpForm: FormGroup = new FormGroup({})
  errorMessage: string = ''


  ngOnInit(): void {
    this.setFormState()
  }

  setFormState() {
    this.signUpForm = this.formBuilder.group({
      name: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      username: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
      address: [''],
      phone: ['', [Validators.pattern('^[0-9]{10}$')]],
      pincode: ['', [Validators.required, Validators.pattern('^[0-9]{6}$'),]],
    })
  }

  onSubmit() {
    const rawForm = this.signUpForm.getRawValue();

    this.loader.showLoader()
    localStorage.setItem('email', rawForm.email)
    localStorage.setItem('password', rawForm.password)

    this.authService.signUp(rawForm.name, rawForm.email, rawForm.password, rawForm.username, rawForm.phone, rawForm.address, rawForm.pincode)
      .pipe(finalize(() => this.loader.hideLoader()))
      .subscribe({
        next: () => this.router.navigateByUrl('/email-ver'),
        error: err => {
          this.errorMessage = err
        }
      });
  }

  googleSignIn() {
    const provider = new GoogleAuthProvider();

    signInWithPopup(this.auth, provider)
      .then((result) => {
        console.log('User Signed In:', result.user);
        this.router.navigateByUrl("/log-in")
      })
      .catch((error) => {
        console.error('Error during sign-in:', error);
      })
  }

}
