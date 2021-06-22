import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriasService {

  //VARIABLE QUE VA A CONTENER NUESTRA LISTA DE SUBCATEGORIAS

  subcategoriasColeccion: AngularFirestoreCollection<any>;
  subcategorias: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.subcategoriasColeccion = afs.collection<any>('subcategorias');
    this.subcategorias = this.subcategoriasColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }

  //FUNCION OBTENER SUBCATEGORIAS DE LA BASE DE DATOS
  obtenerSubcategorias() {
    return this.subcategorias;
  }

  //FUNCION AGREGAR SUBCATEGORIA EN LA BASE DE DATOS
  agregarSubcategoria(nuevaSubcategoria: any) {
    this.subcategoriasColeccion.doc(nuevaSubcategoria.id).set(nuevaSubcategoria);
  }

  //FUNCION MODIFICAR SUBCATEGORIA DE LA BASE DE DATOS
  editarSubcategoria(subcategoriaEditada: any) {
    return this.subcategoriasColeccion.doc(subcategoriaEditada.id).update(subcategoriaEditada);
  }

  //FUNCION ELIMINAR SUBCATEGORIA DE LA BASE DE DATOS
  eliminarSubcategoria(idSubcategoriaEliminar: string){
    return this.subcategoriasColeccion.doc(idSubcategoriaEliminar).delete();
  }
}
