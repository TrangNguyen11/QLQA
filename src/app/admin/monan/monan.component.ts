import { Component, OnInit, Inject } from '@angular/core';
import { MonanService } from './monan.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-monan',
  templateUrl: './monan.component.html',
  styleUrls: ['./monan.component.css']
})
export class MonanComponent implements OnInit {
  public data:any=[];
  dlMonan = [];
  closeResult: string;
  dlUpdate ;
  constructor(private service: MonanService, private router: Router, private modalService: NgbModal) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
    this.service.getDataMonan().subscribe((lst: any)=>{
      this.dlMonan = lst.monan;
    })
  }
}