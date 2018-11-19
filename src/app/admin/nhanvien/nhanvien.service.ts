import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NhanvienService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  baseAPIAdmin  = environment.base_apiadmin;
  constructor(private http: HttpClient) { }

  getDataNhanvien = ()=>{
    return this.http.get(`${this.baseAPIAdmin}nhanvien/getNhanvien`);
  }
  getHinh = () => {
    return this.http.get(`${this.baseAPI}hinh`);
  }
  postDeleteNhanVien = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}nhanvien/delNhanvien`, data);
  }
  postUpdateNhanVien = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}nhanvien/updateNhanVien`, data);
  }
  postInserteNhanVien = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}nhanvien/insertNhanvien`, data);
  }  
}
 