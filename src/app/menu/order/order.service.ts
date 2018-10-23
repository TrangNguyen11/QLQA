import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor(
    private http: HttpClient
  ) { 
  }
  getData = ()=>{
    return this.http.get(`${ this.baseAPI }order/monan`);
  }
  getDanhMuc = ()=>{
    return this.http.get(`${ this.baseAPI }danhmuc`);
  }
  //get name ban
  getName = (id) => {
    let data = { id : id};
    return this.http.post(`${this.baseAPI}sodo/nameban`, data);
  }
  //insert vao bang chi tiet dat mon khi bam nut gui bep
  insertChiTietDM = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPI}order/insertchitiet`, data );
  }
  getSession = ()=>{
    return this.http.get(`${this.baseReal}getListTable`);
  }
  
  
}
 