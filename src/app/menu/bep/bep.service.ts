import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../../environments/environment';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class BepService {
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor( private http: HttpClient  ) { 
    this.socket = io(this.baseReal);
  }
  getDataBep = ()=>{
    return this.http.get(`${this.baseReal}getMonAnBep`);
  }
  getDataDaXong = ()=>{
    return this.http.get(`${this.baseReal}getListTable`);
  }
}
 