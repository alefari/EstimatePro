import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Presupuesto } from '../models/presupuesto.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresupuestosService {

  //VARIABLE QUE VA A CONTENER NUESTRA LISTA DE ITEMS

  presupuestosColeccion: AngularFirestoreCollection<Presupuesto>;
  presupuestos: Observable<Presupuesto[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.presupuestosColeccion = afs.collection<Presupuesto>('presupuestos');
    this.presupuestos = this.presupuestosColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Presupuesto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }

  //FUNCION OBTENER PRESUPUESTOS DE LA BASE DE DATOS
  obtenerPresupuestos() {
    return this.presupuestos;
  }

  //FUNCION AGREGAR PRESUPUESTO EN LA BASE DE DATOS
  agregarPresupuesto(nuevoPresupuesto: Presupuesto) {
    this.presupuestosColeccion.doc().set(nuevoPresupuesto);
  }

  //FUNCION MODIFICAR PRESUPUESTO DE LA BASE DE DATOS
  editarPresupuesto(presupuestoEditado: Presupuesto) {
    return this.presupuestosColeccion.doc(presupuestoEditado.id).update(presupuestoEditado);
  }

  //FUNCION ELIMINAR PRESUPUESTO DE LA BASE DE DATOS
  eliminarPresupuesto(idPresupuestoliminar: string){
    return this.presupuestosColeccion.doc(idPresupuestoliminar).delete();
  }
}
