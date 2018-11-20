import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';
@Injectable({
  providedIn: 'root'
})
export class ThongkeService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  baseAPIAdmin  = environment.base_apiadmin;
  constructor(private http: HttpClient) { }
  public exportAsExcelFile(json: any[], excelFileName: string): void {
    
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    console.log('worksheet',worksheet);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    //const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'buffer' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  getDataThongKe = ()=>{
    return this.http.get(`${this.baseAPIAdmin}thongke/getThongke`);
  } 
  getThongKeThang = ()=>{
    return this.http.get(`${this.baseAPIAdmin}thongke/getDataTKThang`);
  } 
  getThongKeGio = ()=>{
    return this.http.get(`${this.baseAPIAdmin}thongke/getDataTKGio`);
  }
  getThongKeMonAn = ()=>{
    return this.http.get(`${this.baseAPIAdmin}thongke/getDataTKMonAn`);
  }
  getMonAn = ()=>{
    return this.http.get(`${this.baseAPIAdmin}thongke/getMonAn`);
  }
   
}
 