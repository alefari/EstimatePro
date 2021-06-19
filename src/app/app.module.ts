import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { PresupuestoComponent } from './components/presupuesto/presupuesto.component';
import { ListaPresupuestoComponent } from './components/lista-presupuesto/lista-presupuesto.component';
import { InventarioComponent } from './components/inventario/inventario.component';
import { IngresarComponent } from './components/inventario/ingresar/ingresar.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    PresupuestoComponent,
    ListaPresupuestoComponent,
    InventarioComponent,
    IngresarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
