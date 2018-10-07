import { Injectable } from '@angular/core';
import { HttpClient }    from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  basehost = "http://localhost:8000/";
  constructor(
    private http: HttpClient
  ) { }
  getData = (email, pass)=>{
    return this.http.post(this.basehost, {});
  } 
}
 