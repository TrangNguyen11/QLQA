import { Component, OnInit } from '@angular/core';
import { HoadonService } from './hoadon.service';
@Component({
  selector: 'menu-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})

export class HoadonComponent implements OnInit {
  constructor( private service: HoadonService ) { 
  }
  ngOnInit() {
  }
}