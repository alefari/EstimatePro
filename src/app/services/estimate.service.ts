import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Presupuesto } from '../models/presupuesto.models';

@Injectable({
  providedIn: 'root'
})
export class EstimateService {

  private presupuestoDoc: AngularFirestoreDocument<Presupuesto>;
  presupuesto: Observable<any>;

  constructor(private readonly afs: AngularFirestore) {}


  obtenerPresupuesto(id: string) {
    this.presupuestoDoc = this.afs.doc<Presupuesto>(`presupuestos/${id}`);
    this.presupuesto = this.presupuestoDoc.valueChanges();
    return this.presupuesto;
  }


}
