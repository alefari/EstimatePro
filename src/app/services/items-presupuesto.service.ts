import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemPresupuesto } from '../models/itemPreupuesto.models';

@Injectable({
  providedIn: 'root'
})
export class ItemsPresupuestoService {

  itemsColeccion: AngularFirestoreCollection<ItemPresupuesto>;
  items: Observable<ItemPresupuesto[]>;

  constructor(private readonly afs: AngularFirestore) {

  }

  agregarItem(nuevoItem: ItemPresupuesto) {
    this.itemsColeccion.doc().set(nuevoItem);
  }

  obtenerItems(idPresupuesto: string) {
    this.itemsColeccion = this.afs.collection<ItemPresupuesto>(`presupuestos/${idPresupuesto}/items`);
    this.items = this.itemsColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as ItemPresupuesto;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    return this.items;
  }

  eliminarItem(idItemliminar: string){
    return this.itemsColeccion.doc(idItemliminar).delete();
  }
}
