import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DanhmucService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  baseAPIAdmin  = environment.base_apiadmin;

  constructor(private http: HttpClient) { }

  getDataDanhmuc = ()=>{
    return this.http.get(`${this.baseAPIAdmin}danhmuc/getDanhmuc`);
  }
  postDeleteDanhmuc = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}danhmuc/delDanhmuc`, data);
  }
  postUpdateDanhmuc = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}danhmuc/updateDanhmuc`, data);
  }  
  postInserteDanhmuc = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}danhmuc/insertDanhmuc`, data);
  }    
}
 