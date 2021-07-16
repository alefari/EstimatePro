import { Component, OnInit } from '@angular/core';
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

  constructor(private servicioAuth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    this.servicioAuth.signin(email, password).subscribe(
      resData => {
        this.isLoading = false;
        this.router.navigate(['/'])
      },
      errorMessage => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    )
    form.reset();
  }

}
