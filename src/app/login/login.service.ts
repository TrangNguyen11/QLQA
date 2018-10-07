import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  basehost = "http://localhost:8000/api/postLogin";
  constructor(
    private http: HttpClient
  ) { }
  login(email, password):any {
    let data = {email, password};
    return this.http.post(this.basehost, data)
  }
}
