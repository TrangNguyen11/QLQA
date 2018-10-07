import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  
  constructor(
    private http: HttpClient
  ) { }
  getData = ()=>{
    return this.http.get("http://localhost:8000/api/order/micay");
  }
  getDataMicay = ()=>{
    return this.http.get("http://localhost:8000/api/order/micay");
  }
  getDataLau = ()=>{
    return this.http.get("http://localhost:8000/api/order/lau");
  }
  getDataCombo = ()=>{
    return this.http.get("http://localhost:8000/api/order/combo");
  }
  getDataAnvat = ()=>{
    return this.http.get("http://localhost:8000/api/order/anvat");
  }
  getDataDouong = ()=>{
    return this.http.get("http://localhost:8000/api/order/douong");
  }
  getMonanhq = ()=>{
    return this.http.get("http://localhost:8000/api/order/monanhanquoc");
  }
}
 