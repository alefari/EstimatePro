import { Component, OnInit, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { of, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  private userSub: Subscription;
  isAuthenticated = false;
  user: User;

  constructor(private servicioAuth: AuthService, private afAuth: AngularFireAuth) { }

  ngOnInit(): void {
    this.userSub = this.servicioAuth.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.user = user;
      // this.isAuthenticated = !user ? false : true;
    });

    // var myModal = new bootstrap.Modal(document.getElementById('myModal'), {
    //   keyboard: false
    // })

    // this.afAuth.authState.pipe(
    //   switchMap(usuario => {
    //     if(usuario) {
    //       console.log(usuario);
    //       return null
    //     }
    //     else {
    //       return of(null)
    //     }
    //   })
    // )
  }

  // this.usuario$ = this.afAuth.authState.pipe(
  //   switchMap(usuario => {
  //     if(usuario) {
  //       return this.afs.doc<Usuario>(`usuarios/${usuario.uid}`).valueChanges();
  //     } else {
  //       return of(null);
  //     }
  //   })
  // )

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }

  onLogout() {
    this.servicioAuth.logout().then(res => {
      console.log(res)
    });
  }

  onChangePassword() {
    this.servicioAuth.changePassword(this.user.email);
  }

}
