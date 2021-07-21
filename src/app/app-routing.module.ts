import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPresupuestoComponent } from '../app/components/lista-presupuesto/lista-presupuesto.component';
import { InventarioComponent } from '../app/components/inventario/inventario.component';
import { LoginComponent } from '../app/components/login/login.component';
import { PresupuestoComponent } from '../app/components/presupuesto/presupuesto.component';
import { ParametrosComponent } from './components/inventario/parametros/parametros.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {path: 'estimates', component: ListaPresupuestoComponent },
  {path: 'inventario', component: InventarioComponent },
  {path: 'estimates/:id', component: PresupuestoComponent },
  {path: 'login', component: LoginComponent },
  {path: 'parametros', component: ParametrosComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
