import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class KhuyenMaiService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  baseAPIAdmin  = environment.base_apiadmin;
  constructor(private http: HttpClient) { }

  getDataKhuyenmai = ()=>{
    return this.http.get(`${this.baseAPIAdmin}khuyenmai/getKhuyenmai`);
  }
  postDeleteKhuyenmai = (id)=>{
    return this.http.post(`${this.baseAPIAdmin}khuyenmai/delKhuyenmai`, {id});
  }
  postUpdateKhuyenmai = (item)=>{
    return this.http.post(`${this.baseAPIAdmin}khuyenmai/updateKhuyenmai`, { item });
  }   
  postInserKhuyenmai = (item)=>{
    return this.http.post(`${this.baseAPIAdmin}khuyenmai/insertKhuyenmai`, { item });
  }
  checkMaKM = (item)=>{
    return this.http.post(`${this.baseAPIAdmin}khuyenmai/checkMa`, { item });
  }
}
 