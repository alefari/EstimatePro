import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, observable, of, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import * as firebase from 'firebase/app'

interface AuthResponseData {
  idToken:	string,
  email:	string,
  refreshToken:	string,
  expiresIn:	string,
  localId:	string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>
  // user: Observable<firebase.User>;

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap(usuario => {
          if(usuario) {
            return this.afs.doc<User>(`usuarios/${usuario.uid}`).valueChanges();
          }
          else {
            return of(null);
          }
        })
      )

  }

  // signup(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   ).pipe(
  //     catchError(this.handleError),
  //     tap(resData => {
  //       this.handleAuthentication(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn)
  //     })
  //   );
  // }

  async signUp(email: string, password: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
    .then((credential) => {
      this.updateUserData(credential.user);
    });
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`usuarios/${user.uid}`);
    const data = {
      uid: user.uid,
      email: user.email
    }
    return userRef.set(data, {merge: true });
  }

  async login(email: string, password: string) {
    return this.afAuth.signInWithEmailAndPassword(email, password);

  }

  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['/login']);
    console.log('Logged Out')
  }

  async changePassword(email: string) {
    this.afAuth.sendPasswordResetEmail(email);
  }

  // signin(email: string, password: string) {
  //   return this.http.post<AuthResponseData>(
  //     `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`,
  //     {
  //       email: email,
  //       password: password,
  //       returnSecureToken: true
  //     }
  //   ).pipe(
  //     catchError(this.handleError),
  //     tap(resData => {
  //       this.handleAuthentication(
  //         resData.email,
  //         resData.localId,
  //         resData.idToken,
  //         +resData.expiresIn)
  //     })
  //     );
  // }

  // signout() {
  //   this.user.next(null);
  //   this.router.navigate(['/login'])
  // }

  // private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
  //   const expirationDate = new Date(
  //     new Date().getTime() + expiresIn * 1000
  //   );
  //     const user = new User(
  //       email,
  //       userId,
  //       token,
  //       expirationDate
  //     );
  //     this.user.next(user);
  // }

  // private handleError(errorRes: HttpErrorResponse) {
  //   console.log(errorRes)
  //   let errorMessage = 'An unknown error occurred!';
  //     if(!errorRes.error || !errorRes.error.error) {
  //       return throwError(errorMessage);
  //     }
  //     switch (errorRes.error.error.message) {
  //       case 'EMAIL_EXISTS':
  //         errorMessage = "This email exists aready";
  //         break;
  //       case 'TOO_MANY_ATTEMPTS_TRY_LATER':
  //         errorMessage = "You have been blocked for unusual activity, try again later";
  //         break;
  //       case 'EMAIL_NOT_FOUND':
  //         errorMessage = "This email does not exist";
  //         break;
  //       case 'INVALID_PASSWORD':
  //         errorMessage = "This password is not correct";
  //         break;
  //       case 'USER_DISABLED':
  //         errorMessage = "This user has been disabled by an administrator";
  //         break;
  //     }
  //     return throwError(errorMessage);
  // }


}
