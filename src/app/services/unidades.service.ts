import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Unidad } from '../models/unidad.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  //VARIABLE QUE VA A CONTENER NUESTRA LISTA DE CATEGORIAS

  unidadesColeccion: AngularFirestoreCollection<any>;
  unidades: Observable<any[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.unidadesColeccion = afs.collection<any>('unidades');
    this.unidades = this.unidadesColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as any;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }

  //FUNCION OBTENER UNIDADES DE LA BASE DE DATOS
  obtenerUnidades() {
    return this.unidades;
  }

  //FUNCION AGREGAR UNIDAD EN LA BASE DE DATOS
  agregarUnidad(nuevaUnidad: any) {
    this.unidadesColeccion.doc(nuevaUnidad.id).set(nuevaUnidad);
  }

  //FUNCION MODIFICAR UNIDAD DE LA BASE DE DATOS
  editarUnidad(unidadEditada: any) {
    return this.unidadesColeccion.doc(unidadEditada.id).update(unidadEditada);
  }

  //FUNCION ELIMINAR UNIDAD DE LA BASE DE DATOS
  eliminarUnidad(idUnidadEliminar: string){
    return this.unidadesColeccion.doc(idUnidadEliminar).delete();
  }
}
