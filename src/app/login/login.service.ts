import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseAPI = environment.base_api;
  baseReal = environment.base_realtime;
  constructor(
    private http: HttpClient
  ) { }
  login(email, password):any {
    let data = {email, password};
    return this.http.post(`${this.baseAPI}postLogin`, data)
  }
}
 