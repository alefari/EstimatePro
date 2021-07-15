import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.models';
import { ItemPresupuesto } from 'src/app/models/itemPreupuesto.models';
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

  itemsPresupuesto: ItemPresupuesto[] = [];
  presupuesto = {} as Presupuesto;
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
    laborModifier: null,
    materialModifier: null,
    equipmentModifier: null,
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
      this.itemsPresupuesto = items;
      this.updateCalc()
    }),
    this.servicioEstimate.obtenerPresupuesto(this.idPresupuesto).subscribe(presupuesto => {
      this.presupuesto = presupuesto;
      this.nuevosDatosPresupuesto = presupuesto;
      this.updateCalc()
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
  }

  onSubmit() {
  }

  valueChanged(item: ItemPresupuesto) {
    this.updateCalc()
    this.updateItemFirebase(item)
  }

  updateItemFirebase(item: ItemPresupuesto) {
    this.servicioItemsPresupuesto.editarItem(item)
  }

  updateCalc() {
    if(typeof this.presupuesto == 'undefined' || typeof this.itemsPresupuesto == 'undefined') {
      return
    }
    this.itemsPresupuesto.forEach(item => {
      // PRODUCTION RATE (VALOR INTERNO)
      item.productionRate = item.productionRateBase * item.L;

      // LABOR HOURS (VALOR INTERNO)
      item.laborHours = item.productionRate * item.qty

      // LABOR RATE
      if(this.presupuesto.tipo == "Government") {
        item.laborRate = this.presupuesto.laborGubernamental
      }
      else {
        if(this.presupuesto.laborModifier == 0) {
          item.laborRate = item.laborRateBase * item.L;
        }
        else {
          item.laborRate = item.laborRateBase + item.laborRateBase * this.presupuesto.laborModifier * 0.01 * item.L;
        }
      }

      // MATERIAL RATE
      if(this.presupuesto.materialModifier == 0) {
        item.materialRate = item.materialRateBase * item.M;
      }
      else {
        item.materialRate = item.materialRateBase + item.materialRateBase * this.presupuesto.materialModifier * 0.01 * item.M;
      }

      // EQUIPMENT RATE
      if(this.presupuesto.equipmentModifier == 0) {
        item.equipmentRate = item.equipmentRateBase;
      }
      else {
        item.equipmentRate = item.equipmentRateBase + item.equipmentRateBase * this.presupuesto.equipmentModifier * 0.01;
      }

      // LABOR COSTS
      item.estLaborCosts = ((this.presupuesto.tipo == "Private") ? (item.qty * item.laborRate) : item.laborHours * this.presupuesto.laborGubernamental)

      // MATERIAL COSTS
      item.estMatCosts = item.qty * item.materialRate;

      // EQUIPMENT COSTS
      item.estEquipment = item.qty * item.equipmentRate + (item.qty * item.equipmentRate * this.presupuesto.taxPercentage);

      // EST. MATERIAL
      item.estMat = item.estMatCosts + item.estMatCosts * this.presupuesto.taxPercentage;

      // EST SUB MARKUP
      item.estSubMarkup = 0;

      // TOTALS
      item.totals = (item.estLaborCosts + item.estMat) + (item.estLaborCosts + item.estMat) * (item.estSubMarkup/100) + item.estEquipment;

    });
  }

  onAddItem(item: Item) {
    let itemPresupuesto: ItemPresupuesto = {
      ...item,
      L: 1,
      M: 1,
      qty: 1,
      estLaborCosts: 0,
      estEquipment: 0,
      laborHours: 0,
      laborRate: 0,
      materialRate: 0,
      equipmentRate: 0,
      estMat: 0,
      estSubMarkup: 0,
      totals: 0
    }
    delete itemPresupuesto.id
    this.servicioItemsPresupuesto.agregarItem(itemPresupuesto);
    this.updateCalc()
  }

  //FUNCION MODIFICAR PRESUPUESTO
  modificarPresupuesto(){
    this.nuevosDatosPresupuesto.id = this.idPresupuesto;
    this.servicioPresupuestos.editarPresupuesto(this.nuevosDatosPresupuesto);
  }

  //FUNCION MODIFICAR PRESUPUESTO
  asignarItemPresupuestoEliminar(id: string, nombre: string){
    this.infoItemEliminar.id = id;
    this.infoItemEliminar.nombre= nombre;
    console.log(this.infoItemEliminar)
  }
  eliminarItemPresupuesto(){
    this.servicioItemsPresupuesto.eliminarItem(this.infoItemEliminar.id);
  }

  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
    this.form.reset();
    }

}
