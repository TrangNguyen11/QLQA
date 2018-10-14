import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';
import io from 'socket.io-client';

@Injectable()
export class SodoService {
  socket;
  constructor(private http: HttpClient) {
      this.socket = io('http://localhost:3000/');

   }
  getData = ()=>{
    return this.http.get("http://localhost:8000/api/sodo/sodo");
  }
  picBanChuaSD = ()=>{
    return this.http.get("http://localhost:8000/api/sodo/banchuasudung");
  }
  picBanDaSD = ()=>{
    return this.http.get("http://localhost:8000/api/sodo/bandasudung");
  }
}
