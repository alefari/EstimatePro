import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
const ExcelJS = require('exceljs');
import * as fs from 'file-saver';
import { Observable } from 'rxjs';
import * as stream from 'stream';
import { ItemPresupuesto } from '../models/itemPreupuesto.models';
import { Presupuesto } from '../models/presupuesto.models';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {
  excelURL: Observable<string | null>;
  constructor(private storage: AngularFireStorage) {
    const ref = this.storage.ref('EstimateRef.xlsx');
    this.excelURL = ref.getDownloadURL();
  }

  testExcel(items: ItemPresupuesto[], presupuesto: Presupuesto) {
    let itemsArray = [];
    let currentRow = 7;
    items.forEach((objetoItem, i) => {
      console.log(i)
      itemsArray.push([
        objetoItem.L,
        objetoItem.M,
        objetoItem.nombre,
        objetoItem.qty,
        objetoItem.unidad,
        objetoItem.productionRate,
        { formula: `D${currentRow}*F${currentRow}`, result: objetoItem.laborHours },
        objetoItem.laborRate,
        objetoItem.materialRate,
        objetoItem.equipmentRate,
        objetoItem.estLaborCosts,
        { formula: `D${currentRow}*I${currentRow}`, result: objetoItem.estMatCosts },
        { formula: `D${currentRow}*J${currentRow}+(D${currentRow}*J${currentRow}*0.0725)`, result: objetoItem.estMatCosts },
        objetoItem.estMat,
        objetoItem.estSubMarkup,
        { formula: 'A1+A2', result: 7 },
      ])
      currentRow++;
    });
    console.log(itemsArray)

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'EstimatePro';
    workbook.lastModifiedBy = 'EstimatePro';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    const sheet = workbook.addWorksheet('Estimate', {properties:{tabColor:{argb:'FFC0000'}}});

    // AGREGAR TABLA PARAMETROS PRESUPUESTO
    sheet.addTable({
      name: 'Params.',
      ref: 'T3',
      headerRow: true,
      totalsRow: false,
      style: {
      },
      columns: [
        {name: 'Labor Mod.'},
        {name: 'Material Mod.'},
        {name: 'Equipment Mod.'},
        {name: 'Zip Code'},
        {name: 'Tax'},
        {name: 'Prevailing custom Hr On/Off'},
        {name: 'Prevailing Rate'},
        {name: 'Profit'},
      ],
      rows: [
        [
          presupuesto.laborModifier,
          presupuesto.materialModifier,
          presupuesto.equipmentModifier,
          presupuesto.zipCode,
          presupuesto.taxPercentage,
          presupuesto.tipo,
          presupuesto.laborGubernamental,
          presupuesto.profitPercentage,
        ]
      ],
    });

    sheet.addTable({
      name: 'Estimate',
      ref: 'A6',
      headerRow: true,
      totalsRow: false,
      style: {

      },
      columns: [
        {name: 'L'},
        {name: 'M'},
        {name: 'Scope'},
        {name: 'Qty'},
        {name: 'Unit'},
        {name: 'Production Rate'},
        {name: 'Labor Hours'},
        {name: 'Labor Rate'},
        {name: 'Material Rate'},
        {name: 'Equipment Rate'},
        {name: 'Est. Labor costs'},
        {name: 'Est. Mat. Costs'},
        {name: 'Est. Equipment (Tax Incl.'},
        {name: 'Est. Mat (Tax Incl.'},
        {name: 'Est. Sub Markup'},
        {name: 'Totals'},
      ],
      rows: itemsArray
    });

    sheet.getCell('F6').alignment = { wrapText: true};
    sheet.getCell('G6').alignment = { wrapText: true};
    sheet.getCell('H6').alignment = { wrapText: true};
    sheet.getCell('I6').alignment = { wrapText: true};
    sheet.getCell('J6').alignment = { wrapText: true};
    sheet.getCell('K6').alignment = { wrapText: true};
    sheet.getCell('L6').alignment = { wrapText: true};

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Estimate'+'-'+new Date().toUTCString()+'.xlsx');
    });
  }
}
