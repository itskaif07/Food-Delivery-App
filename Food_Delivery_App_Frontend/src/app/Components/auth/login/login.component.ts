import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { LoaderService } from '../../../Shared/service/loader.service';
import { GoogleAuthProvider } from 'firebase/auth';
import { Auth, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit, OnDestroy {

  fb = inject(FormBuilder)
  authService = inject(AuthService)
  router = inject(Router)
  loader = inject(LoaderService)
  auth = inject(Auth)

  errorMessage: string | null = ''
  uid: string = ''

  updatedName:string = ''
   updatedUsername:string = ''
   updatedPhone:string = ''
   updatedAddress:string = ''
   updatedPin:string = ''

  user: any = null;


  loginForm: FormGroup = new FormGroup({})

  userSubscription: Subscription | null = null;

  ngOnInit(): void {
    this.setFormState();
    this.loader.showLoader()
    this.userSubscription = this.authService.user$.subscribe((user) => {
      if (user) {
        this.user = user;
        this.uid = user.uid
        this.authService.fetchUserData(this.uid).subscribe((res:any)=>{
          
          const combinedData = {...this.authService.userSubject.value, ...res}

          this.updatedName = combinedData.fullName ? combinedData.fullName : "Not Provided";
          this.updatedUsername = combinedData.displayName ? combinedData.displayName : "Not Provided";
          this.updatedPhone = combinedData.phone ? combinedData.phone : "Not Provided";
          this.updatedAddress = combinedData.address ? combinedData.address : "Not Provided";
          this.updatedPin = combinedData.pincode ? combinedData.pincode : "Not Provided";
          this.loader.hideLoader()
        })
      } else {
        this.user = null;
        this.loader.hideLoader()
      }
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

  isEditingName:boolean = false;

  toggleNameEdit(){
    if(this.isEditingName){
      this.updateName()
    }

    this.isEditingName = !this.isEditingName
  }

  updateName() {
    if (this.uid) {
      console.log(this.updatedName)
      this.authService.updateField(this.uid, 'fullName', this.updatedName).subscribe({
        next: () => {
          console.log('Name updated successfully');
        },
        error: (err) => {
          console.error('Error updating name:', err);
        }
      })
    }
  }

  isEditingUserName:boolean = false;

  toggleUsernameEdit(){
    if(this.isEditingUserName){
      this.updateUsername()
    }

    this.isEditingUserName = !this.isEditingUserName
  }

  updateUsername() {
    if (this.uid) {
      this.authService.updateField(this.uid, 'displayName', this.updatedUsername).subscribe({
        next: () => {
          console.log('Username updated successfully');
        },
        error: (err) => {
          console.error('Error updating username:', err);
        }
      });
    }
  }

  isEditingPhone:boolean = false;

  togglePhoneEdit(){
    if(this.isEditingPhone){
      this.updatePhone()
    }

    this.isEditingPhone = !this.isEditingPhone
  }

  
  updatePhone() {
    if (this.uid) {
      this.authService.updateField(this.uid, 'phone', this.updatedPhone).subscribe({
        next: () => {
          console.log('Phone number updated successfully');
        },
        error: (err) => {
          console.error('Error updating phone number:', err);
        }
      });
    }
  }

  isEditingAddress:boolean = false;


  toggleAddressEdit(){
    if(this.isEditingAddress){
      this.updateAddress()
    }

    this.isEditingAddress = !this.isEditingAddress
  }

  updateAddress() {
    if (this.uid) {
      this.authService.updateField(this.uid, 'address', this.updatedAddress).subscribe({
        next: () => {
          console.log('Name updated successfully');
        },
        error: (err) => {
          console.error('Error updating name:', err);
        }
      })
    }
  }

  isEditingPincode:boolean = false;

  
  togglePincodeEdit(){
    if(this.isEditingPincode){
      this.updatePincode()
    }

    this.isEditingPincode = !this.isEditingPincode
  }

  updatePincode() {
    if (this.uid) {
      this.authService.updateField(this.uid, 'pincode', this.updatedPin).subscribe({
        next: () => {
          console.log('Pincode updated successfully');
        },
        error: (err) => {
          console.error('Error updating pincode:', err);
        }
      });
    }
  }


  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe(); // Unsubscribe from the user observable
    }
  }
}
