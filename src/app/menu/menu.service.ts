import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import io from 'socket.io-client';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  basehost = "http://localhost:8000/";
  socket;
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor(
    private http: HttpClient
  ) { 
    this.socket = io(this.baseReal);
  }
  getData = (email, pass)=>{
    return this.http.post(this.basehost, {});
  } 
}
 