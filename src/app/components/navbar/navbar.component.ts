import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private servicioAuth: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.servicioAuth.user.subscribe(user => {
      this.isAuthenticated = !!user;
      // this.isAuthenticated = !user ? false : true;
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

}
