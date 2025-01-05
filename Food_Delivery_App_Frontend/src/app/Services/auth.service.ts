import { inject, Injectable, OnDestroy } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, from, Observable, catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  auth: Auth = inject(Auth)
  fireStore: Firestore = inject(Firestore)

  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)

  private authSubscription;

  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged(user => {
      this.userSubject.next(user)
    })
  }

  signUp(fullName:string, email: string, password: string, username: string, phone: string = '', address: string = '', pincode: string): Observable<void> {
    const promise = createUserWithEmailAndPassword(this.auth, email, password)
      .then(response => {
        updateProfile(response.user, { displayName: username })
          .then(() => {
            return this.saveUserDetails(response.user.uid, fullName, address, phone, pincode)
          })
      })
      .catch(error => {
        console.error("Error during signup:", error);
      });

    return from(promise).pipe(
      map(() => { }),
      catchError(error => {
        console.error("Error in signup:", error);
        return throwError(() => new Error(error.message));
      })
    );

  }

  saveUserDetails(uid: string, fullName:string, address: string, phone: string, pincode: string): Promise<void> {
    const userRef = doc(this.fireStore, 'users', uid)

    return setDoc(userRef, {
      fullName: fullName,
      address: address,
      phone: phone,
      pincode: pincode
    }).then(() => {
      console.log("User details saved in Firestore.");
    }).catch((error) => {
      console.error("Error saving user details in Firestore:", error);
      throw error;  // rethrow to propagate error in the stream
    });
  }



  logIn(email: string, password: string): Observable<void> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);

    return from(promise).pipe(
      map((userCredential) => {
        const user = userCredential.user;
        this.fetchUserData(user);  // Fetch user data after login
      }),
      catchError((error) => {
        console.log('Error in login:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }



  logOut(): Observable<void> {
    const promise = signOut(this.auth)

    return from(promise).pipe(
      map(() => { }),
      catchError(err => {
        return throwError(() => new Error(err.message))
      })
    )
  }

  public fetchUserData(user: any) {
    const userDocRef = doc(this.fireStore, 'users', user.uid);

    getDoc(userDocRef).then((docSnap) => {
      if (docSnap.exists()) {
        const userData = docSnap.data();
        this.userSubject.next({ ...user, ...userData });
      }
    });
  }


  get user$() {
    return this.userSubject.asObservable();
  }



  isLoggedIn(): boolean {
    return !!this.userSubject.value
  }



  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription;
    }
  }

}