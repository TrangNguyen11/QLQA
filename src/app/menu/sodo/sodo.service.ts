import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import io from 'socket.io-client';
import { environment } from '../../../environments/environment';
@Injectable()
export class SodoService {
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor(private http: HttpClient) {
      this.socket = io(this.baseReal);

   }
  getData = ()=>{
    return this.http.get(`${this.baseAPI}sodo/sodo`);
  }
  picBanChuaSD = ()=>{
    return this.http.get(`${this.baseAPI}sodo/banchuasudung`);
  }
  picBanDaSD = ()=>{
    return this.http.get(`${this.baseAPI}sodo/bandasudung`);
  }
  getSession = () =>{
    return this.http.get( `${this.baseReal}getListTable`)
  }
}
