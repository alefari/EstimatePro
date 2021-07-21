import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPresupuestoComponent } from '../app/components/lista-presupuesto/lista-presupuesto.component';
import { InventarioComponent } from '../app/components/inventario/inventario.component';
import { LoginComponent } from '../app/components/login/login.component';
import { PresupuestoComponent } from '../app/components/presupuesto/presupuesto.component';
import { ParametrosComponent } from './components/inventario/parametros/parametros.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  {path: 'estimates',
    component: ListaPresupuestoComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

  {path: 'inventario',
    component: InventarioComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

  {path: 'estimates/:id',
    component: PresupuestoComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },

  {path: 'login', component: LoginComponent },

  {path: 'parametros',
    component: ParametrosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
