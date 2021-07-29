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
      laborRateBase: 0,
      materialRateBase: 0,
      equipmentRateBase: 0,
      productionRateBase: 0,
      fecha: null,
  };

  datosItemModificar: Item = {
      nombre: '',
      categoria: '',
      subcategoria: '',
      unidad: '',
      laborRateBase: 0,
      materialRateBase: 0,
      equipmentRateBase: 0,
      productionRateBase: 0,
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
  recibirInformacionModificarItem(itemModificar: Item){
    this.datosItemModificar = {...itemModificar};
  }

  modificarItem(form: NgForm){
    this.datosItemModificar = {
      id: this.datosItemModificar.id,
      nombre: form.value.nombreModal,
      categoria: form.value.categoriaModal,
      subcategoria: form.value.subcategoriaModal,
      unidad: form.value.unidadModal,
      laborRateBase: form.value.laborRateBaseModal,
      materialRateBase: form.value.materialRateBaseModal,
      equipmentRateBase: form.value.equipmentRateBaseModal,
      productionRateBase: form.value.productionRateBaseModal,
      fecha: this.datosItemModificar.fecha,
    }
    this.servicioItems.editarItem(this.datosItemModificar);
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
    // this.form.reset();
  }

}
