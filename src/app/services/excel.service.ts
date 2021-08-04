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
    let categoriasRows = [];
    let subcategoriasRows = [];
    console.log(items)
    items.forEach((objetoItem) => {
      let arrayFormulas = [
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
      ]
      if(objetoItem.categoria == "" && objetoItem.subcategoria == "") {
        itemsArray.push(arrayFormulas)
        currentRow++;
      }
    });
    subcategoriasPresupuesto.forEach((subcategoria) => {
      if(items.some(item => item.categoria == "" && item.subcategoria == subcategoria)) {
        itemsArray.push(["","",subcategoria,"","","","","","","","","","","","","","","",""]);
        subcategoriasRows.push(currentRow);
        currentRow++;
        items.forEach((objetoItem) => {
          let arrayFormulas = [
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
          ]
          if(objetoItem.categoria == "" && objetoItem.subcategoria == subcategoria) {
            itemsArray.push(arrayFormulas)
            currentRow++;
          }
        });
      }
    })
    categoriasPresupuesto.forEach((categoria) => {
      itemsArray.push(["","",categoria,"","","","","","","","","","","","","","","",""]);
      categoriasRows.push(currentRow);
      currentRow++;
      items.forEach((objetoItem) => {
        let arrayFormulas = [
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
        ]
        if(objetoItem.categoria == categoria && objetoItem.subcategoria == "") {
          itemsArray.push(arrayFormulas)
          currentRow++;
        }
      });
      subcategoriasPresupuesto.forEach((subcategoria) => {
        if(items.some(item => item.categoria == categoria && item.subcategoria == subcategoria)) {
          itemsArray.push(["","",subcategoria,"","","","","","","","","","","","","","","",""]);
          subcategoriasRows.push(currentRow);
          currentRow++;
          items.forEach((objetoItem) => {
            let arrayFormulas = [
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
            ]
            if(objetoItem.categoria == categoria && objetoItem.subcategoria == subcategoria) {
              itemsArray.push(arrayFormulas)
              currentRow++;
            }
          });
        }
      })
    })

    console.log(itemsArray)

    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'EstimatePro';
    workbook.lastModifiedBy = 'EstimatePro';
    workbook.created = new Date();
    workbook.modified = new Date();
    workbook.properties.date1904 = true;
    workbook.calcProperties.fullCalcOnLoad = true;
    const sheet = workbook.addWorksheet('Estimate', {views: [{showGridLines: false}]});

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
        theme: 'TableStyleMedium15'
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

    let widths = [4, 4, 50, 10, 6, 12, 12, 12, 12, 12, 12, 12, 12, 12, 8, 20]
    for (let i = 1; i < 20; i++) {
      sheet.getColumn(i).width = widths[i-1];
    }

    let hidden = ['F','G','M','Q','R','S',];
    hidden.forEach(element => {
      sheet.getColumn(element).hidden = true;
    });

    let currency = ['H','I','J','K','L','M','N','P'];
    currency.forEach(element => {
      sheet.getColumn(element).numFmt = '"$"#,##0.00;[Red]\-"$"#,##0.00';
    });

    categoriasRows.forEach(row => {
      let fila = sheet.getRow(row)
      for (let i = 3; i < 17; i++) {
        fila.getCell(i).font = {bold: true, color: {argb: 'FFFFFFFF'}, size:12};
        fila.getCell(i).fill = {
          type: 'pattern',
          pattern:'solid',
          fgColor:{argb:'00000000'},
          bgColor:{argb:'00000000'}
        };
      }
    });

    subcategoriasRows.forEach(row => {
      let fila = sheet.getRow(row)
      for (let i = 3; i < 17; i++) {
        fila.getCell(i).font = {italic: true, bold: true, underline: true};

      }
    });

    sheet.getRow(6).alignment = { wrapText: true, horizontal: 'center'};
    sheet.getRow(6).font = { color: {argb: 'FFFFFFFF'}};

    //add data and file name and download
    workbook.xlsx.writeBuffer().then((data) => {
      let blob = new Blob([data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      fs.saveAs(blob, 'Estimate'+'-'+new Date().toUTCString()+'.xlsx');
    });
  }
}
