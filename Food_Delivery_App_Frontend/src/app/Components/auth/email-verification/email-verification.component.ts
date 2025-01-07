import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { applyActionCode, Auth } from '@angular/fire/auth'; // Correct imports for modular SDK
import { sendEmailVerification } from 'firebase/auth';
import { CommonModule } from '@angular/common';
import { LoaderService } from '../../../Shared/service/loader.service';

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
  loader = inject(LoaderService)

  infoMessage: string | null = null
  errorMessage: string | null = null

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((params) => {
      this.verificationCode = params['oobCode'];
      if (this.verificationCode) {
        this.verifyEmail(this.verificationCode);
      }
    });
  }

  verifyEmail(code: string) {
    applyActionCode(this.auth, code) // Call modular SDK's applyActionCode
      .then(() => {
        console.log('Email successfully verified');
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-action-code') {
          console.error('The link is invalid or has already been used.');
          this.errorMessage = 'The link is invalid or has already been used.'

        } else if (error.code === 'auth/action-code-expired') {
          console.error('The verification link has expired.');
          this.errorMessage = "The verification link has expired."
        } else {
          console.error('Error during email verification:', error);
          this.errorMessage = "Error during email verification"
        }
      })
  }

  resendVerificationEmail() {
    const user = this.auth.currentUser
    if (user) {
      this.loader.showLoader()
      sendEmailVerification(user)
        .then(() => {
          this.loader.hideLoader()
          this.infoMessage = "A new verification link sent to your Email"
        })
        .catch(() => {
          this.loader.hideLoader()
          this.errorMessage = "'Failed to resend verification email. Please try again"
        })
    }
    else {
      alert('User not found. Please log in again.');
    }
  }
}
