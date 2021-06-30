import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Item } from 'src/app/models/item.models';
import { CategoriasService } from 'src/app/services/categorias.service';
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

  itemsPresupuesto: Item[] = [];

  idPresupuesto: string = '';

  constructor(private servicioCategorias: CategoriasService,
              private servicioItems: ItemsService,
              private servicioItemsPresupuesto: ItemsPresupuestoService,
              private servicioSubcategorias: SubcategoriasService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idPresupuesto = this.route.snapshot.params['id'];
    this.servicioItemsPresupuesto.cargarColeccion(this.idPresupuesto);
    this.servicioItemsPresupuesto.obtenerItems().subscribe(items => {
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
  }

  onSubmit() {

  }

  onAddItem(item: Item) {
    this.servicioItemsPresupuesto.agregarItem(item);
  }

}
