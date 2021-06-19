import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../services/presupuestos.service'
import { Presupuesto } from '../../models/presupuesto.models'

@Component({
  selector: 'app-lista-presupuesto',
  templateUrl: './lista-presupuesto.component.html',
  styleUrls: ['./lista-presupuesto.component.scss']
})
export class ListaPresupuestoComponent implements OnInit {

  listaPresupuestos: Presupuesto[];

  constructor(private servicioPresupuestos: PresupuestosService) { }

  ngOnInit(): void { 
    this.servicioPresupuestos.obtenerPresupuestos().subscribe(presupuestos => {
      this.listaPresupuestos = presupuestos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

}
