import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsPresupuestoService {

  itemsColeccion: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private readonly afs: AngularFirestore) {

  }

  cargarColeccion(idPresupuesto: string) {
    this.itemsColeccion = this.afs.collection<Item>(`presupuestos/${idPresupuesto}/items`);
    this.items = this.itemsColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
  }

  agregarItem(nuevoItem: Item) {
    this.itemsColeccion.doc().set(nuevoItem);
  }

  obtenerItems() {
    return this.items;
  }

  eliminarItem(idItemliminar: string){
    return this.itemsColeccion.doc(idItemliminar).delete();
  }
}
