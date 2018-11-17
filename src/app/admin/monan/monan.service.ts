import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MonanService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  baseAPIAdmin  = environment.base_apiadmin;
  constructor(private http: HttpClient) { }

  getDataMonan = ()=>{
    return this.http.get(`${this.baseAPIAdmin}monan/getMonan`);
  }

  getDataDanhMuc = () => {
    return this.http.get(`${this.baseAPI}danhmuc`);
  }

  getHinh = () => {
    return this.http.get(`${this.baseAPI}hinh`);
  }
  postDeleteMonan = (id)=>{
    return this.http.post(`${this.baseAPIAdmin}monan/delMonan`, {id});
  }
  postUpdateMonan = (item)=>{
    return this.http.post(`${this.baseAPIAdmin}monan/updateMonan`, { item });
  }   
  postInserMonan = (item)=>{
    item.hinh  = item.hinh.slice(item.hinh.indexOf(',') + 1);
      
    return this.http.post(`${this.baseAPIAdmin}monan/insertMonan`, { item });
  }  
}
 