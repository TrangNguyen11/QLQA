import { Component, OnInit } from '@angular/core';
import { CheckorderService } from './checkorder.service';
@Component({
  selector: 'menu-hoadon',
  templateUrl: './checkorder.component.html',
  styleUrls: ['./checkorder.component.css']
})

export class CheckorderComponent implements OnInit {
  constructor( private service: CheckorderService ) { 
  }
  ngOnInit() {

  }

  
}