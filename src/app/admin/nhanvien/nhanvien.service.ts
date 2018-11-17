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
  postDeleteBan = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}monan/delBan`, data);
  }
  postUpdateBan = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}monan/updateBan`, data);
  }   
}
 