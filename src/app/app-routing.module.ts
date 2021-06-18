import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaPresupuestoComponent } from '../app/components/lista-presupuesto/lista-presupuesto.component';
import { InventarioComponent } from '../app/components/inventario/inventario.component';
import { LoginComponent } from '../app/components/login/login.component';
import { PresupuestoComponent } from '../app/components/presupuesto/presupuesto.component';

const routes: Routes = [
  {path: '', component: ListaPresupuestoComponent },
  {path: 'inventario', component: InventarioComponent },
  {path: 'presupuesto', component: PresupuestoComponent },
  {path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
