import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA6jCnuEdJRCz6XFl091LnAa-_cWRK6ETw",
    authDomain: "sample-firebase-ai-app-7b76d.firebaseapp.com",
    projectId: "sample-firebase-ai-app-7b76d",
    storageBucket: "sample-firebase-ai-app-7b76d.appspot.com",
    messagingSenderId: "914298605400",
    appId: "1:914298605400:web:91e8299b1a72af39bfdf2d"
  }

export const appConfig: ApplicationConfig = {
  providers: 
  [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
