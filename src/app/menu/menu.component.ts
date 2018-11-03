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
  btnMangVe(tenkh){
    let thoigian = moment().format("YYYY-MM-DD hh:mm:ss");
      this.service.socket.emit('sudungban', { idArr: [ tenkh ], thoigian: thoigian, mangve: 11}, (tenkh)=> {
        this._router.navigate(['order', tenkh]);
      });
    
  }
}
