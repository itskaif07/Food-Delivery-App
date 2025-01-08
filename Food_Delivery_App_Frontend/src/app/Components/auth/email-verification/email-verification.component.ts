import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { applyActionCode, Auth } from '@angular/fire/auth'; // Correct imports for modular SDK
import { sendEmailVerification } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Shared/service/loader.service';
import { AuthService } from '../../../Services/auth.service';

@Component({
  selector: 'app-email-verification',
  imports: [CommonModule],
  templateUrl: './email-verification.component.html',
  styleUrls: ['./email-verification.component.css'], // Fixed typo: styleUrl -> styleUrls
})

export class EmailVerificationComponent implements OnInit {
  verificationCode: string | null = '';
  router = inject(Router);
  activeRoute = inject(ActivatedRoute);
  auth = inject(Auth);
  loader = inject(LoaderService);
  authService = inject(AuthService)

  infoMessage: string | null = null;
  errorMessage: string | null = null;

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.verificationCode = params['oobCode'];
      if (this.verificationCode) {
        this.verifyEmail(this.verificationCode);
      }
    });
  }

  verifyEmail(code: string) {
    this.loader.showLoader();
    applyActionCode(this.auth, code)
      .then(() => {
        this.loader.hideLoader();
        this.infoMessage = 'Your email has been successfully verified!';
        this.logInUser()
      })
      .catch((error) => {
        this.loader.hideLoader();
        if (error.code === 'auth/invalid-action-code') {
          this.errorMessage = 'The link is invalid or has already been used.';
        } else if (error.code === 'auth/action-code-expired') {
          this.errorMessage = 'The verification link has expired. Please request a new one.';
        } else {
          this.errorMessage = 'Error during email verification.';
        }
      });
  }

  logInUser() {
    const email = localStorage.getItem('email')
    const password = localStorage.getItem('password')
    console.log(email, password)

    if (email && password) {
      this.authService.logIn(email, password).subscribe((res: any) => {
        this.router.navigateByUrl('/');
      }, error => {
        console.log("some error while login", error)
      })
    }
  }


  resendVerificationEmail() {
    const user = this.auth.currentUser;
    if (user) {
      this.loader.showLoader();
      sendEmailVerification(user)
        .then(() => {
          this.loader.hideLoader();
          this.infoMessage = 'A new verification email has been sent to your email address.';
        })
        .catch((error) => {
          this.loader.hideLoader();
          if (error.code === 'auth/too-many-requests') {
            this.errorMessage = 'Too many requests. Please try again later.';
          } else {
            this.errorMessage = 'Failed to resend verification email. Please try again later.';
          }
        });
    } else {
      alert('User not logged in. Please log in to resend the verification email.');
    }
  }
}
