import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from 'src/app/models/item.models';
import { CategoriasService } from 'src/app/services/categorias.service';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { UnidadesService } from 'src/app/services/unidades.service';
import { ItemsService } from '../../../services/items.service'

@Component({
  selector: 'app-ingresar',
  templateUrl: './ingresar.component.html',
  styleUrls: ['./ingresar.component.scss']
})
export class IngresarComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  //VARIABLE QUE VA A GUARDAR LA LISTA COMPLETA DE SERVICIOS
  listaItems: Item[];
  listaCategorias: any[];
  listaSubcategorias: any[];
  listaUnidades: any[];

  nuevoItem: Item ={
    nombre: '',
    categoria: '',
    subcategoria: '',
    unidad: '',
    laborRateBase: 0,
    materialRateBase: 0,
    equipmentRateBase: 0,
    productionRateBase: 0,
    fecha: null,
  };

  constructor(private servicioCategorias: CategoriasService,
              private servicioUnidades: UnidadesService,
              private servicioSubcategorias: SubcategoriasService,
              private servicioItems: ItemsService) { }

  ngOnInit(): void {
    this.servicioCategorias.obtenerCategorias().subscribe(categorias => {
      this.listaCategorias = categorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioSubcategorias.obtenerSubcategorias().subscribe(subcategorias => {
      this.listaSubcategorias = subcategorias.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
    this.servicioUnidades.obtenerUnidades().subscribe(unidades => {
      this.listaUnidades = unidades.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }

  //FUNCION PARA AGREGAR ITEM A LA BD
  onSubmit(){
    this.nuevoItem.fecha=new Date().toISOString();

    for (const key in this.nuevoItem) {
      if (Object.prototype.hasOwnProperty.call(this.nuevoItem, key)) {
        if(this.nuevoItem[key] === null) {

          this.nuevoItem[key] = '';
        }
      }
    }

    this.servicioItems.agregarItem(this.nuevoItem);
    this.form.reset();
    }

  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
    this.form.reset();
    this.nuevoItem = {
      nombre: '',
      categoria: '',
      subcategoria: '',
      unidad: '',
      laborRateBase: 0,
      materialRateBase: 0,
      equipmentRateBase: 0,
      productionRateBase: 0,
      fecha: null,
      };
  }

}
