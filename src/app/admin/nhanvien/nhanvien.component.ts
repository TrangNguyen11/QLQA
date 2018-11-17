import { Component, OnInit, Inject } from '@angular/core';
import { NhanvienService } from './nhanvien.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'admin-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
  public data:any=[];
  dlNhanvien = [];
  closeResult: string;
  dlUpdate ;
  constructor(private service: NhanvienService, private router: Router, private modalService: NgbModal) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
    this.service.getDataNhanvien().subscribe((lst: any)=>{
      this.dlNhanvien = lst.nhanvien;
    })
  }
}