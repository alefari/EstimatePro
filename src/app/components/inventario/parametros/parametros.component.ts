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

  //VARIABLE QUE OBTIENE DATOS PARA AGREGAR
  nuevaCategoria:any = {nombre:""};
  nuevaSubcategoria:any = {nombre:""};
  nuevaUnidad:any = {nombre:""};

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

                                                                  //FUNCIONES PARA AGREGAR REGISTROS
  //FUNCIONES AGREGAR CATEGORIA
  agregarCategoria(){
    if (this.nuevaCategoria.nombre!="" && this.nuevaCategoria.nombre!= null) {
      this.servicioCategorias.agregarCategoria(this.nuevaCategoria);
      this.nuevaCategoria.nombre="";
    }
  }
  //FUNCIONES AGREGAR SUBCATEGORIA
  agregarSubcategoria(){
    if (this.nuevaSubcategoria.nombre!="" && this.nuevaSubcategoria.nombre!= null) {
      this.servicioSubcategorias.agregarSubcategoria(this.nuevaSubcategoria);
      this.nuevaSubcategoria.nombre="";
    }
  }
  //FUNCIONES AGREGAR UNIDAD
  agregarUnidad(){
    if (this.nuevaUnidad.nombre!="" && this.nuevaUnidad.nombre!= null) {
      this.servicioUnidades.agregarUnidad(this.nuevaUnidad);
      this.nuevaUnidad.nombre="";
    }
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
