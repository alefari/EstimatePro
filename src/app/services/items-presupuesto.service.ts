import { Inject, Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Item } from '../models/item.models'
import { Presupuesto } from '../models/presupuesto.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsPresupuestoService {

  itemsColeccion: AngularFirestoreCollection<Item>;
  private presupuestoDoc: AngularFirestoreDocument<Presupuesto>;
  items: Observable<Item[]>;

  constructor(private readonly afs: AngularFirestore) {

  }

  agregarItem(nuevoItem: Item) {
    this.itemsColeccion.doc().set(nuevoItem);
  }

  obtenerItems(idPresupuesto: string) {
    this.itemsColeccion = this.afs.collection<Item>(`presupuestos/${idPresupuesto}/items`);
    this.items = this.itemsColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )
    return this.items;
  }

  eliminarItem(idPresupuesto: any, idItemEliminar: any){
    this.presupuestoDoc = this.afs.doc<Presupuesto>(`presupuestos/${idPresupuesto}`);
    return this.presupuestoDoc.collection("items").doc(idItemEliminar).delete();
  }
}
