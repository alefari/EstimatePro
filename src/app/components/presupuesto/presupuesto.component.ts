import { Component, OnInit } from '@angular/core';
import { Item } from 'src/app/models/item.models';
import { CategoriasService } from 'src/app/services/categorias.service';
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

  constructor(private servicioCategorias: CategoriasService,
              private servicioItems: ItemsService,
              private servicioSubcategorias: SubcategoriasService) { }

  ngOnInit(): void {
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
    this.itemsPresupuesto.push(item);
  }

}
