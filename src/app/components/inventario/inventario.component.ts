import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../../models/item.models'
import { Unidad } from 'src/app/models/unidad.models';
import { CategoriasService } from '../../services/categorias.service'
import { UnidadesService } from '../../services/unidades.service'
import { ItemsService } from '../../services/items.service'
import { SubcategoriasService } from 'src/app/services/subcategorias.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.scss']
})
export class InventarioComponent implements OnInit {

  @ViewChild('f') form: NgForm;

  //VARIABLE QUE VA A GUARDAR LA LISTA COMPLETA DE SERVICIOS
  listaItems: Item[];
  listaCategorias: any[];
  listaSubcategorias: any[];
  listaUnidades: any[];
  

                                                    //FARIIIIII TENEMOS QUE VERIFICAR EN EL MODEL, COLOQUE TODO COMO ANY EN LOS TIPOS DE VARIABLE PORQUE ME ESTABAN DANDO ERROR
  nuevoItem: Item = {
    id: null,
    nombre: null,
    categoria: null,
    subcategoria: null,
    unidad: null,
    descripcion: null,
    laborRate: null,
    materialRate: null,
    equipmentRate: null,
    fecha: null,
    idUsuario: null,
    };

  constructor(private servicioCategorias: CategoriasService,
              private servicioUnidades: UnidadesService,
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
    this.servicioUnidades.obtenerUnidades().subscribe(unidades => {
      this.listaUnidades = unidades.sort((a, b) => (a.nombre > b.nombre) ? 1 : -1);
    })
  }



  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
    this.form.reset();
    this.nuevoItem = {
      id: null,
      nombre: null,
      categoria: null,
      subcategoria: null,
      unidad: null,
      descripcion: null,
      laborRate: null,
      materialRate: null,
      equipmentRate: null,
      fecha: null,
      idUsuario: null,
      };
  }

}
