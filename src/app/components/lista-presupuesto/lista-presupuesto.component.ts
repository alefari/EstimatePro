import { Component, OnInit, ViewChild} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PresupuestosService } from '../../services/presupuestos.service'
import { Presupuesto } from '../../models/presupuesto.models'
import { timestamp } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-presupuesto',
  templateUrl: './lista-presupuesto.component.html',
  styleUrls: ['./lista-presupuesto.component.scss']
})
export class ListaPresupuestoComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  listaPresupuestos: Presupuesto[];
  filtroFecha:any = {
    inicial: 0,
    final: new Date().getTime()
  }

  nuevoPresupuesto:Presupuesto = {
      nombre: '',
      tipo: '',
      totalProjectCost: null,
      contingencyPercentage: null,
      taxPercentage: null,
      profitPercentage: null,
      zipCode: null,
      estatus: '',
      fecha: null,
      laborGubernamental: null,
      laborModifier: null,
      materialModifier: null,
      equipmentModifier: null,
      idUsuario: null,
      descripcion: null,
  }

  infoPresupuesto: Presupuesto = {
    id: '',
    nombre: '',
    tipo: '',
    totalProjectCost: null,
    contingencyPercentage: null,
    taxPercentage: null,
    profitPercentage: null,
    zipCode: null,
    estatus: '',
    fecha: null,
    laborGubernamental: null,
    laborModifier: null,
    materialModifier: null,
    equipmentModifier: null,
    idUsuario: null,
    descripcion: null,
}
  infoPresupuestoEliminar = {id: "", nombre: "",}

  constructor(private servicioPresupuestos: PresupuestosService, public router: Router) { }

  ngOnInit(): void {
    this.servicioPresupuestos.obtenerPresupuestos().subscribe(presupuestos => {
      this.listaPresupuestos = presupuestos.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })

  }

  //FUNCION PARA AGREGAR PRESUPUESTO A LA BD
  onSubmit(){
    this.nuevoPresupuesto.estatus="Incomplete";
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
  }

  onModify(id: any) {
    this.router.navigate([`estimates/${id}`])
  }

  //FUNCIONES ELIMINAR PRESUPUESTO
  recibirInformacionPresupuestoEliminar(idPresupuestoEliminar: any, nombrePresupuestoEliminar:any){
    this.infoPresupuestoEliminar.id = idPresupuestoEliminar;
    this.infoPresupuestoEliminar.nombre= nombrePresupuestoEliminar;
  }
  eliminarPresupuesto(){
    this.servicioPresupuestos.eliminarPresupuesto(this.infoPresupuestoEliminar.id);
    this.infoPresupuestoEliminar = {id: "", nombre: "",}
  }

  checkDates(fechaPresup: string) {
    let fechaPresupMs = new Date(fechaPresup).getTime();
    let fechaInicialMs = new Date(this.filtroFecha.inicial).getTime();
    let fechaFinalMs = new Date(this.filtroFecha.final).getTime();
    if(fechaPresupMs > fechaInicialMs && fechaPresupMs <= fechaFinalMs) {
      return true
    }
    else {
      return false
    }
  }
}
