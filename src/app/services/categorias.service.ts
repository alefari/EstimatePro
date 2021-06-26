import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  //VARIABLE QUE VA A CONTENER NUESTRA LISTA DE CATEGORIAS

  categoriasColeccion: AngularFirestoreCollection<any>;
  categorias: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.categoriasColeccion = afs.collection<any>('categorias');
    this.categorias = this.categoriasColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }

  //FUNCION OBTENER CATEGORIAS DE LA BASE DE DATOS
  obtenerCategorias() {
    return this.categorias;
  }

  //FUNCION AGREGAR CATEGORIA EN LA BASE DE DATOS
  agregarCategoria(nuevaCategoria: any) {
    this.categoriasColeccion.doc().set(nuevaCategoria);
  }

  //FUNCION MODIFICAR CATEGORIA DE LA BASE DE DATOS
  editarCategoria(categoriaEditada: any) {
    return this.categoriasColeccion.doc(categoriaEditada.id).update(categoriaEditada);
  }

  //FUNCION ELIMINAR CATEGORIA DE LA BASE DE DATOS
  eliminarCategoria(idCategoriaEliminar: string){
    return this.categoriasColeccion.doc(idCategoriaEliminar).delete();
  }
}
