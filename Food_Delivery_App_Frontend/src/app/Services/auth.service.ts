import { inject, Injectable, OnDestroy } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from '@angular/fire/auth';
import { Firestore, updateDoc } from '@angular/fire/firestore';
import { sendEmailVerification } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { BehaviorSubject, from, Observable, catchError, map, throwError, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {

  auth: Auth = inject(Auth)
  fireStore: Firestore = inject(Firestore)


  userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null)
  get user$() {
    return this.userSubject.asObservable();
  }

  private authSubscription;

  constructor() {
    this.authSubscription = this.auth.onAuthStateChanged(user => {
      this.userSubject.next(user)
    })
  }

  signUp(fullName: string, email: string, password: string, username: string, phone = '', address = '', pincode: string): Observable<void> {
    return from(createUserWithEmailAndPassword(this.auth, email, password)).pipe(
      switchMap(userCredentials => {
        if (userCredentials) {
          return from(updateProfile(userCredentials.user, { displayName: username })).pipe(
            switchMap(() => from(sendEmailVerification(userCredentials.user))),
            switchMap(() => from(this.saveUserDetails(userCredentials.user.uid, fullName, address, phone, pincode))),
          );
        }
        return throwError(() => new Error('User credentials not found'));
      }),
      catchError(err => {
        console.error("Error in signup:", err);
        return throwError(() => new Error(err.message));
      })
    );
  }



  saveUserDetails(uid: string, fullName: string, address: string, phone: string, pincode: string): Promise<void> {
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
      throw error;
    });
  }



  logIn(email: string, password: string): Observable<any> {
    const promise = signInWithEmailAndPassword(this.auth, email, password);

    return from(promise).pipe(
      switchMap((userCredential) => {
        const user = userCredential.user;
        return this.fetchUserData(user.uid).pipe(
          map((userData) => {
            this.userSubject.next({ ...user, ...userData });
            return userData;
          })
        );
      }),
      catchError((error) => {
        console.error('Error in login:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }

  public fetchUserData(uid: string): Observable<any> {
    const userDocRef = doc(this.fireStore, 'users', uid);

    return from(getDoc(userDocRef)).pipe(
      map((docSnap) => {
        if (docSnap.exists()) {

          const userData = docSnap.data();
          return { ...this.userSubject.value, ...userData };

        } else {
          console.warn('No user document found!');
          return null;
        }
      }),
      catchError((error) => {
        console.error('Error fetching user data:', error);
        return throwError(() => new Error(error.message));
      })
    );
  }


  updateField(uid: string, fieldName: string, value: any): Observable<any> {
    const userRef = doc(this.fireStore, 'users', uid);
  
    return from(getDoc(userRef)).pipe(
      switchMap((docSnap) => {
        console.log('Document snapshot before update:', docSnap.data()); // Log existing data
  
        if (docSnap.exists()) {
          return from(updateDoc(userRef, {
            [fieldName]: value
          })).pipe(
            switchMap(() => from(getDoc(userRef))), // Fetch updated data
            map((updatedDocSnap) => {
              console.log('Updated document snapshot:', updatedDocSnap.data()); // Log updated data
            }),
            catchError((error) => {
              console.error(`Error updating ${fieldName} in Firestore:`, error);
              return throwError(() => new Error(error));
            })
          );
        } else {
          return from(setDoc(userRef, {
            [fieldName]: value
          })).pipe(
            switchMap(() => from(getDoc(userRef))), // Fetch updated data
            map((updatedDocSnap) => {
              console.log('Created document snapshot:', updatedDocSnap.data()); // Log new data
            }),
            catchError((error) => {
              console.error(`Error creating ${fieldName} in Firestore:`, error);
              return throwError(() => new Error(error));
            })
          );
        }
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




  isLoggedIn(): boolean {
    return !!this.userSubject.value
  }


  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription;
    }
  }

}