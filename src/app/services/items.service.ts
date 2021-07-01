import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Item } from '../models/item.models'
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  //VARIABLE QUE VA A CONTENER NUESTRA LISTA DE ITEMS

  itemsColeccion: AngularFirestoreCollection<Item>;
  items: Observable<Item[]>;

  constructor(private readonly afs: AngularFirestore) {

    this.itemsColeccion = afs.collection<Item>('items');
    this.items = this.itemsColeccion.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Item;
        const id = a.payload.doc.id;
        return { id, ...data };
      }))
    )

  }

  //FUNCION OBTENER ITEMS DE LA BASE DE DATOS
  obtenerItems() {
    return this.items;
  }

  //FUNCION AGREGAR ITEM EN LA BASE DE DATOS
  agregarItem(nuevoItem: Item) {
    this.itemsColeccion.doc().set(nuevoItem);
  }

  //FUNCION MODIFICAR ITEM DE LA BASE DE DATOS
  editarItem(itemEditado: Item) {
    console.log(itemEditado);
    return this.itemsColeccion.doc(itemEditado.id).update(itemEditado);
  }

  //FUNCION ELIMINAR ITEM DE LA BASE DE DATOS
  eliminarItem(idItemliminar: string){
    return this.itemsColeccion.doc(idItemliminar).delete();
  }
}
