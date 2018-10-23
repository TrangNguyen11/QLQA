import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor(
    private http: HttpClient
  ) { }
  getDataChoThanhToan = ()=>{
    return this.http.get(`${ this.baseAPI }hoadon/chothanhtoan`);
  }
  getDataDaThanhToan = ()=>{
    return this.http.get(`${ this.baseAPI }hoadon/dathanhtoan`);
  }
  getDataGiaoHang = ()=>{
    return this.http.get(`${ this.baseAPI }hoadon/giaohang`);
  }
}