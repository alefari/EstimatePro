import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.models';
import { Presupuesto } from 'src/app/models/presupuesto.models';
import { CategoriasService } from 'src/app/services/categorias.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { ItemsPresupuestoService } from 'src/app/services/items-presupuesto.service';
import { ItemsService } from 'src/app/services/items.service';
import { PresupuestosService } from 'src/app/services/presupuestos.service';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  listaItems: Item[];
  listaCategorias: any[];
  listaSubcategorias: any[];

  itemsPresupuesto: Item[] = [];
  presupuesto: Presupuesto;
  idPresupuesto: string = '';

  nuevosDatosPresupuesto:Presupuesto = {
    id: "",
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
    laborRate: null,
    materialRate: null,
    equipmentRate: null,
    idUsuario: null,
    descripcion: null,
}

  infoItemEliminar = {id: "", nombre: "",}

  constructor(private servicioCategorias: CategoriasService,
              private servicioItems: ItemsService,
              private servicioEstimate: EstimateService,
              private servicioItemsPresupuesto: ItemsPresupuestoService,
              private servicioSubcategorias: SubcategoriasService,
              private servicioPresupuestos: PresupuestosService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPresupuesto = this.route.snapshot.params['id'];
    this.servicioItemsPresupuesto.obtenerItems(this.idPresupuesto).subscribe(items => {
      this.itemsPresupuesto = items.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioItems.obtenerItems().subscribe(items => {
      this.listaItems = items.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioCategorias.obtenerCategorias().subscribe(categorias => {
      this.listaCategorias = categorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioSubcategorias.obtenerSubcategorias().subscribe(subcategorias => {
      this.listaSubcategorias = subcategorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioEstimate.obtenerPresupuesto(this.idPresupuesto).subscribe(presupuesto => {
      this.presupuesto = presupuesto;
      this.nuevosDatosPresupuesto = presupuesto;
    })

  }

  onSubmit() {

  }

  onAddItem(item: Item) {
    this.servicioItemsPresupuesto.agregarItem(item);
  }

  //FUNCION MODIFICAR PRESUPUESTO
  modificarPresupuesto(){
    this.nuevosDatosPresupuesto.id = this.idPresupuesto;
    this.servicioPresupuestos.editarPresupuesto(this.nuevosDatosPresupuesto);
  }

  //FUNCION MODIFICAR PRESUPUESTO
  asignarItemPresupuestoEliminar(id: any, nombre: any){
    this.infoItemEliminar.id = id;
    this.infoItemEliminar.nombre= nombre;
  }
  eliminarItemPresupuesto(){
    this.servicioItemsPresupuesto.eliminarItem(this.presupuesto.id,this.infoItemEliminar.id);
  }

  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
    this.form.reset();
    }

}
