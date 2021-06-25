import { Component, OnInit } from '@angular/core';
import { CategoriasService } from 'src/app/services/categorias.service';
import { SubcategoriasService } from 'src/app/services/subcategorias.service';
import { UnidadesService } from 'src/app/services/unidades.service';

@Component({
  selector: 'app-parametros',
  templateUrl: './parametros.component.html',
  styleUrls: ['./parametros.component.scss']
})
export class ParametrosComponent implements OnInit {

  listaCategorias: any[];
  listaSubcategorias: any[];
  listaUnidades: any[];

  //VARIABLE QUE OBTIENE DATOS PARA MODIFICAR
  infoCategoriaModificar = {id: "", nombre: "",};
  infoSubcategoriaModificar = {id: "", nombre: "",};
  infoUnidadModificar = {id: "", nombre: "",};
  nuevoNombreCategoria:string ="";
  nuevoNombreSubcategoria:string ="";
  nuevoNombreUnidad:string ="";

  //VARIABLE QUE OBTIENE DATOS PARA ELIMINAR
  infoCategoriaEliminar = {id: "", nombre: "",}
  infoSubcategoriaEliminar = {id: "", nombre: "",}
  infoUnidadEliminar = {id: "", nombre: "",}

  constructor(private servicioCategorias: CategoriasService,
              private servicioSubcategorias: SubcategoriasService,
              private servicioUnidades: UnidadesService) { }

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
                                                                  //FUNCIONES PARA MODIFICAR REGISTROS
  //FUNCIONES MODIFICAR CATEGORIA
  recibirInformacionCategoriaModificar(idCategoriaModificar: string, nombreCategoriaModificar:string){
    this.infoCategoriaModificar.id = idCategoriaModificar;
    this.infoCategoriaModificar.nombre= nombreCategoriaModificar;
  }
  modificarCategoria(){
    this.infoCategoriaModificar.nombre = this.nuevoNombreCategoria;
    this.servicioCategorias.editarCategoria(this.infoCategoriaModificar);
  }
  //FUNCIONES MODIFICAR SUBCATEGORIA
  recibirInformacionSubcategoriaModificar(idSubcategoriaModificar: string, nombreSubcategoriaModificar:string){
    this.infoSubcategoriaModificar.id = idSubcategoriaModificar;
    this.infoSubcategoriaModificar.nombre= nombreSubcategoriaModificar;
  }
  modificarSubcategoria(){
    this.infoSubcategoriaModificar.nombre = this.nuevoNombreSubcategoria;
    this.servicioSubcategorias.editarSubcategoria(this.infoSubcategoriaModificar);
  }
  //FUNCIONES MODIFICAR UNIDAD
  recibirInformacionUnidadModificar(idUnidadModificar: string, nombreUnidadaModificar:string){
    this.infoUnidadModificar.id = idUnidadModificar;
    this.infoUnidadModificar.nombre= nombreUnidadaModificar;
  }
  modificarUnidad(){
    this.infoUnidadModificar.nombre = this.nuevoNombreUnidad;
    this.servicioUnidades.editarUnidad(this.infoUnidadModificar);
  }
                                                                  //FUNCIONES PARA ELIMINAR REGISTROS

    //FUNCIONES ELIMINAR CATEGORIA
  recibirInformacionCategoriaEliminar(idCategoriaEliminar: string, nombreCategoriaEliminar:string){
    this.infoCategoriaEliminar.id = idCategoriaEliminar;
    this.infoCategoriaEliminar.nombre= nombreCategoriaEliminar;
  }
  eliminarCategoria(){
    this.servicioCategorias.eliminarCategoria(this.infoCategoriaEliminar.id);
  }
    //FUNCIONES ELIMINAR SUBCATEGORIA
  recibirInformacionSubcategoriaEliminar(idSubcategoriaEliminar:string, nombreSubcategoriaEliminar:string){
    this.infoSubcategoriaEliminar.id = idSubcategoriaEliminar;
    this.infoSubcategoriaEliminar.nombre= nombreSubcategoriaEliminar;
  }
  eliminarSubcategoria(){
    this.servicioSubcategorias.eliminarSubcategoria(this.infoSubcategoriaEliminar.id);
  }
    //FUNCIONES ELIMINAR UNIDAD
  recibirInformacionUnidadEliminar(idUnidadEliminar: string, nombreUnidadEliminar:string){
    this.infoUnidadEliminar.id = idUnidadEliminar;
    this.infoUnidadEliminar.nombre= nombreUnidadEliminar;
  }
  eliminarUnidad(){
    this.servicioUnidades.eliminarUnidad(this.infoUnidadEliminar.id);
  }

}
