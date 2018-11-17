import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  baseAPIAdmin  = environment.base_apiadmin;

  constructor(private http: HttpClient) { }

  getDataBan = ()=>{
    return this.http.get(`${this.baseAPIAdmin}ban/getBan`);
  }
  postDeleteBan = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}ban/delBan`, data);
  }
  postUpdateBan = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}ban/updateBan`, data);
  }  
  postInserteBan = (item)=>{
    let data = { item };
    return this.http.post(`${this.baseAPIAdmin}ban/insertBan`, data);
  }    
}
 