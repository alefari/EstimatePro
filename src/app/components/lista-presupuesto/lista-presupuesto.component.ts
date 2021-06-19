import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PresupuestosService } from '../../services/presupuestos.service'
import { Presupuesto } from '../../models/presupuesto.models'
import { timestamp } from 'rxjs/operators';

@Component({
  selector: 'app-lista-presupuesto',
  templateUrl: './lista-presupuesto.component.html',
  styleUrls: ['./lista-presupuesto.component.scss']
})
export class ListaPresupuestoComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  listaPresupuestos: Presupuesto[];

  nuevoPresupuesto:Presupuesto = {
      id: null,
      nombre: null,
      tipo: null,
      precio: null,
      estatus: null,
      fecha: null,
      laborGubernamental: null,
      laborRate: null,
      materialRate: null,
      equipmentRate: null,
      idUsuario: null,
      descripcion: null,
  }

  infoPresupuesto: Presupuesto = {
    id: null,
    nombre: null,
    tipo: null,
    precio: null,
    estatus: null,
    fecha: null,
    laborGubernamental: null,
    laborRate: null,
    materialRate: null,
    equipmentRate: null,
    idUsuario: null,
    descripcion: null,
}

  constructor(private servicioPresupuestos: PresupuestosService) { }

  ngOnInit(): void { 
    this.servicioPresupuestos.obtenerPresupuestos().subscribe(presupuestos => {
      this.listaPresupuestos = presupuestos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

  //FUNCION PARA AGREGAR PRESUPUESTO A LA BD
  onSubmit(){
    this.nuevoPresupuesto.estatus="Incompleto";
    this.nuevoPresupuesto.fecha=new Date().toISOString();
    this.nuevoPresupuesto.idUsuario="26778332";
    this.servicioPresupuestos.agregarPresupuesto(this.nuevoPresupuesto);
    console.log(this.nuevoPresupuesto)

    this.form.reset();
    }

  //FUNCION PARA OBTENER DATOS DE PRODUCTO E IMPRIMIR EN MODAL DE INFO
  recibirInformacion(presupuesto: Presupuesto){
    this.infoPresupuesto = presupuesto;
  }
  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
    this.form.reset();
    this.nuevoPresupuesto = {
      id: null,
      nombre: null,
      tipo: null,
      precio: null,
      fecha: null,
      laborGubernamental: null,
      laborRate: null,
      materialRate: null,
      equipmentRate: null,
      idUsuario: null,
      descripcion: null,
      };
  }
}
