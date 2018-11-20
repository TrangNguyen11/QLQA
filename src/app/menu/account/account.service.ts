import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import { environment } from '../../../environments/environment';
import io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor( private http: HttpClient  ) { 
    this.socket = io(this.baseReal);
  }
  getDataAccount = (id)=>{
    return this.http.post(`${this.baseAPI}dataAccount`, {id});
  }
  postUpdateAccount = (item)=>{
    return this.http.post(`${this.baseAPI}updateAccount`, { item });
  }
  
  
}
 