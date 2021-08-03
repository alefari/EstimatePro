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

  testExcel(items: ItemPresupuesto[], presupuesto: Presupuesto, categoriasPresupuesto: any[], subcategoriasPresupuesto: any[]) {
    let itemsArray = [];
    let currentRow = 7;
    items.forEach((objetoItem) => {
      itemsArray.push([
        objetoItem.L,
        objetoItem.M,
        objetoItem.nombre,
        objetoItem.qty,
        objetoItem.unidad,
        { formula: `Q${currentRow}*A${currentRow}`, result: objetoItem.productionRate },
        { formula: `D${currentRow}*F${currentRow}`, result: objetoItem.laborHours },
        { formula: `IF(Y4="Government",Z4,IF(T4=0,Q${currentRow}*A${currentRow},Q${currentRow}+Q${currentRow}*T4*0.01*A${currentRow}))`},
        { formula: `IF(U4=0,R${currentRow}*B${currentRow},R${currentRow}+R${currentRow}*U4*0.01*B${currentRow})`},
        { formula: `IF(V4=0,S${currentRow},S${currentRow}+S${currentRow}*V4*0.01)`},
        { formula: `IF(Y4="Private",D${currentRow}*H${currentRow},G${currentRow}*Z4)`},
        { formula: `D${currentRow}*I${currentRow}` },
        { formula: `D${currentRow}*J${currentRow}+(D${currentRow}*J${currentRow}*X4)`},
        { formula: `L${currentRow}+L${currentRow}*X4`},
        objetoItem.estSubMarkup,
        { formula: `(K${currentRow}+N${currentRow})+(K${currentRow}+N${currentRow})*(O${currentRow}/100)+M${currentRow}`},
        objetoItem.laborRateBase ? objetoItem.laborRateBase : 0,
        objetoItem.materialRateBase ? objetoItem.materialRateBase : 0,
        objetoItem.equipmentRateBase ? objetoItem.equipmentRateBase : 0,
      ])
      currentRow++;
    });

    currentRow++;

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
        {name: 'LaborBase'},
        {name: 'MaterialBase'},
        {name: 'EquipmentBase'},
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
    sheet.getCell('M6').alignment = { wrapText: true};
    sheet.getCell('N6').alignment = { wrapText: true};
    sheet.getCell('O6').alignment = { wrapText: true};

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Estimate'+'-'+new Date().toUTCString()+'.xlsx');
    });
  }
}
