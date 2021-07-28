import { Injectable } from '@angular/core';
const ExcelJS = require('exceljs');
import * as fs from 'file-saver';
import { ItemPresupuesto } from '../models/itemPreupuesto.models';

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  testExcel(items: ItemPresupuesto[]) {
    let itemsArray = [];
    items.forEach(objetoItem => {
      itemsArray.push([
        objetoItem.L,
        objetoItem.M,
        objetoItem.nombre,
        objetoItem.qty,
        objetoItem.unidad,
        objetoItem.laborRate,
        objetoItem.materialRate,
        objetoItem.equipmentRate,
      ])
    });
    console.log(itemsArray)

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'Me';
    workbook.lastModifiedBy = 'Her';
    workbook.created = new Date(1985, 8, 30);
    workbook.modified = new Date();
    workbook.lastPrinted = new Date(2016, 9, 27);
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    const sheet = workbook.addWorksheet('My Sheet', {properties:{tabColor:{argb:'FFC0000'}}});
    let fname="Estimate"

    sheet.addTable({
      name: 'MyTable',
      ref: 'A10',
      headerRow: true,
      totalsRow: true,
      style: {

      },
      columns: [
        {name: 'L'},
        {name: 'M'},
        {name: 'Scope'},
        {name: 'Qty'},
        {name: 'Unit'},
        {name: 'Labor Rate'},
        {name: 'Material Rate'},
        {name: 'Equipment Rate'},
        {name: 'Est. Labor costs'},
        {name: 'Est. Equipment (Tax Incl.'},
        {name: 'Est. Mat (Tax Incl.'},
        {name: 'Est. Sub Markup'},
        {name: 'Totals'},
      ],
      rows: itemsArray,
    });

    sheet.getCell('F10').alignment = { wrapText: true};
    sheet.getCell('G10').alignment = { wrapText: true};
    sheet.getCell('H10').alignment = { wrapText: true};
    sheet.getCell('I10').alignment = { wrapText: true};
    sheet.getCell('J10').alignment = { wrapText: true};
    sheet.getCell('K10').alignment = { wrapText: true};
    sheet.getCell('L10').alignment = { wrapText: true};

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, fname+'-'+new Date().toISOString()+'.xlsx');
    });
  }
}
