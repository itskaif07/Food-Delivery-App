import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../Shared/service/loader.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  loader = inject(LoaderService)

  errorMessage: string | null = ''
  uid: string = ''

  userDetails: any = []
  user: any = null;
  loginForm: FormGroup = new FormGroup({})

  userSubscription: Subscription | null = null; 

  ngOnInit(): void {
    this.setFormState();
    
    this.userSubscription = this.authService.user$.subscribe((user) => {
      console.log('User from authService:', user);
      if (user) {
        this.user = user;
        this.authService.fetchUserData(user)
      } else {
        this.user = null;
      }
      console.log('Updated user:', this.user);
    });
  }  
  

  setFormState() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }



  logOut() {
    this.loader.showLoader()
    this.authService.logOut().subscribe((next) => {
      this.router.navigateByUrl('/')
      this.loader.hideLoader()
    }, err => {
      this.errorMessage = err
      this.loader.hideLoader()
    })
  }

  onSubmit() {
    const rawForm = this.loginForm.getRawValue();
    this.loader.showLoader()
    this.authService.logIn(rawForm.email, rawForm.password).subscribe((next) => {
      this.loader.hideLoader()
    }, error => {
      this.errorMessage = error
      this.loader.hideLoader()
    })
  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Unsubscribe from the user observable
    }
  }
}
