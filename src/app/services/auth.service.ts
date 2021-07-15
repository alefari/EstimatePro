import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    )
  }
}
