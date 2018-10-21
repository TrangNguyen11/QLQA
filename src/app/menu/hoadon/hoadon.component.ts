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
    this.getChoThanhToan();
    this.getDaThanhToan();
    this.getGiaoHang();
  }
  chothanhtoan: any = [];
  getChoThanhToan = ()=>{
    let seft = this;
    this.service.getDataChoThanhToan().subscribe((lst: any)=>{
      seft.chothanhtoan = lst.chothanhtoan;
      console.log(this.chothanhtoan);
    })
  }
  dathanhtoan: any = [];
  getDaThanhToan = ()=>{
    let seft = this;
    this.service.getDataDaThanhToan().subscribe((lst: any)=>{
      seft.dathanhtoan = lst.dathanhtoan;
      console.log(this.dathanhtoan);
    })
  }
  giaohang: any = [];
  getGiaoHang = ()=>{
    let seft = this;
    this.service.getDataGiaoHang().subscribe((lst: any)=>{
      seft.giaohang = lst.giaohang;
      console.log(this.giaohang);
    })
  }
  
  
}