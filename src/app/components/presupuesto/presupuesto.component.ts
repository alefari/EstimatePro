import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.models';
import { ItemPresupuesto } from 'src/app/models/itemPreupuesto.models';
import { Presupuesto } from 'src/app/models/presupuesto.models';
import { CategoriasService } from 'src/app/services/categorias.service';
import { EstimateService } from 'src/app/services/estimate.service';
import { ItemsPresupuestoService } from 'src/app/services/items-presupuesto.service';
import { ItemsService } from 'src/app/services/items.service';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';

@Component({
  selector: 'app-presupuesto',
  templateUrl: './presupuesto.component.html',
  styleUrls: ['./presupuesto.component.scss']
})
export class PresupuestoComponent implements OnInit {

  listaItems: Item[];
  listaCategorias: any[];
  listaSubcategorias: any[];

  itemsPresupuesto: ItemPresupuesto[] = [];
  presupuesto: Presupuesto;
  idPresupuesto: string = '';

  constructor(private servicioCategorias: CategoriasService,
              private servicioItems: ItemsService,
              private servicioEstimate: EstimateService,
              private servicioItemsPresupuesto: ItemsPresupuestoService,
              private servicioSubcategorias: SubcategoriasService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPresupuesto = this.route.snapshot.params['id'];
    this.servicioItemsPresupuesto.obtenerItems(this.idPresupuesto).subscribe(items => {
      this.itemsPresupuesto = items;
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
    })

  }

  onSubmit() {

  }

  updateCalc() {
    this.itemsPresupuesto.forEach(item => {
      item.estLaborCosts = item.qty * item.laborRate;
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
      estMat: 0,
      estSubMarkup: 0,
      totals: 0
    }
    this.servicioItemsPresupuesto.agregarItem(itemPresupuesto);
  }

}
