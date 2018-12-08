import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  constructor(private service: MenuService, private _router: Router) {  }
  ngOnInit() {
  }
  title = "hehehee";
  email ="";
  pass = "";
  getData(){
    this.service.getData(this.email, this.pass)
    .subscribe(lst => console.log(lst))
  }
  logout(){
    localStorage.clear();
    this._router.navigate(['/login'])
  }
}
