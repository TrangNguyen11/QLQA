import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../../environments/environment';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor(
    private http: HttpClient
  ) { 
    this.socket = io(this.baseReal);
  }
  getSession = ()=>{
    return this.http.get(`${ this.baseReal }getListTable`);
  } 
  //insert thanh toán chi tiết
  insertChiTietDM = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPI}hoadon/insertchitiet`, data );
  }
  //insert hoa don
  insertHoaDon = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPI}hoadon/inserthoadon`, data );
  }
  checkKhuyenMai = (ma)=>{
    return this.http.post(`${this.baseAPI}hoadon/khuyenmai`, {ma});
  }
}