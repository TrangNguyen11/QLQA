import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HoadonService {
  
  constructor(
    private http: HttpClient
  ) { }
  getDataChoThanhToan = ()=>{
    return this.http.get("http://localhost:8000/api/hoadon/chothanhtoan");
  }
  getDataDaThanhToan = ()=>{
    return this.http.get("http://localhost:8000/api/hoadon/dathanhtoan");
  }
  getDataGiaoHang = ()=>{
    return this.http.get("http://localhost:8000/api/hoadon/giaohang");
  }
}