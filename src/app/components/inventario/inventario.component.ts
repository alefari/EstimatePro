import { Component, OnInit, ViewChild, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Item } from '../../models/item.models'
import { CategoriasService } from '../../services/categorias.service'
import { ItemsService } from '../../services/items.service'
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { UnidadesService } from 'src/app/services/unidades.service';

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

  infoItem: Item = {
      nombre: '',
      categoria: '',
      subcategoria: '',
      unidad: '',
      laborRate: 0,
      materialRate: 0,
      equipmentRate: 0,
      fecha: null,
  };

  datosItemModificar: any = {
      nombre: '',
      categoria: '',
      subcategoria: '',
      unidad: '',
      laborRate: 0,
      materialRate: 0,
      equipmentRate: 0,
      fecha: null,
  }

  //VARIABLE QUE OBTIENE DATOS PARA ELIMINAR
  infoItemEliminar = {id: "", nombre: "",}

  constructor(private servicioCategorias: CategoriasService,
              private servicioItems: ItemsService,
              private servicioSubcategorias: SubcategoriasService,
              private servicioUnidades: UnidadesService) { }

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
  //FUNCIONES MODIFICAR ITEM
  recibirInformacionModificarItem(idItemModificar:any){
    this.datosItemModificar = this.listaItems.find(producto => producto.id == idItemModificar);

  }
  modificarItem(){
    console.log(this.datosItemModificar)
    this.servicioItems.editarItem(this.datosItemModificar);
    this.form.reset();
  }

  //FUNCIONES ELIMINAR ITEM
  recibirInformacionItemEliminar(idItemEliminar: string, nombreItemEliminar:string){
    this.infoItemEliminar.id = idItemEliminar;
    this.infoItemEliminar.nombre= nombreItemEliminar;
  }
  eliminarItem(){
    this.servicioItems.eliminarItem(this.infoItemEliminar.id);
    this.infoItemEliminar = {id: "", nombre: "",}
  }

  //FUNCION PARA OBTENER DATOS DE PRODUCTO E IMPRIMIR EN MODAL DE INFO
  recibirInformacion(item: Item){
    this.infoItem = item;
  }

  //FUNCION CERRAR MODAL (REINICIO DE CAMPOS)
  cerrarModal() {
  this.form.reset();
  }

}
