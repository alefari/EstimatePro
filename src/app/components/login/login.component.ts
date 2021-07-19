import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoading = false;
  error:any = null;

  constructor(private servicioAuth: AuthService, private router: Router, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.servicioAuth.login(email, password).then(
      res => {
        if(res) {
          console.log(res);
          this.router.navigate(['/'])
        }
      },
      error => {
        console.log(error)
        this.error = error.message;
        this.isLoading = false;
      }
    ).catch(err => {
      console.log(err)
      this.error = err;
      this.isLoading = false;
    });

    form.reset();
  }

  onSignUp(form: NgForm) {
    if (!form.valid) return

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.servicioAuth.signUp(email, password).then(
      res => {
          this.router.navigate(['/'])
      },
      error => {
        console.log(error)
        this.error = error.message;
        this.isLoading = false;
      }
    ).catch(err => {
      console.log(err)
      this.error = err;
      this.isLoading = false;
    });

    form.reset();
  }


}
