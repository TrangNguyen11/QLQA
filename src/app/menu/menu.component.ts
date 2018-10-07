import { Component, OnInit } from '@angular/core';
import { MenuService } from './menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private service: MenuService) { 
 
  }

  ngOnInit() {
  }
  title = "hehehee";
  email ="";
  pass = "";
  getData(){
    this.service.getData(this.email, this.pass)
    .subscribe(lst => console.log(lst))
  }
}
