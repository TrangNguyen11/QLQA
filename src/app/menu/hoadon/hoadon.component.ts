import { Component, OnInit } from '@angular/core';
import { HoadonService } from './hoadon.service';
import { ActivatedRoute, Params } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'menu-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})

export class HoadonComponent implements OnInit {
  constructor( private service: HoadonService, private route: ActivatedRoute, private modalService: NgbModal ) { 
  }
  public sub: any;
  dataSession;
  dlHoaDon = [];
  dlThanhToan = [];
  closeResult: string;
  ngOnInit() {
    // this.getChoThanhToan();
    // this.getDaThanhToan();
    // this.getGiaoHang();
    //load data
    this.loadDataHD();
    this.sub = this.route.params.subscribe(params => {
      this.service.getSession().subscribe( (lst:any) =>{
        this.dataSession = {...lst[params.idsession] , id: params.idsession}
        this.dlThanhToan = !!this.dataSession.monan ? this.dataSession.monan: [] ;
      });
    });

  }
  loadDataHD =()=>{
    this.service.getSession().subscribe( (lst:any) =>{
      Object.keys(lst).forEach((e)=>{
        console.log(lst[e]);
        let dlhd = { tenban:lst[e].monan[0].nameban, sessionID: e, thoigian: lst[e].thoigian, tongtien: lst[e].monan[0].tongtien }
        this.dlHoaDon.push(dlhd);
      });
    });
  }
  openthanhtoan = (thanhtoan, data) => {
    this.modalService.open(thanhtoan).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  btnThanhToan = (data)=>{
    console.log(data);
  }
  
  chothanhtoan: any = [];
  getChoThanhToan = ()=>{
    let seft = this;
    this.service.getDataChoThanhToan().subscribe((lst: any)=>{
      seft.chothanhtoan = lst.chothanhtoan;
    })
  }
  dathanhtoan: any = [];
  getDaThanhToan = ()=>{
    let seft = this;
    this.service.getDataDaThanhToan().subscribe((lst: any)=>{
      seft.dathanhtoan = lst.dathanhtoan;
    })
  }
  giaohang: any = [];
  getGiaoHang = ()=>{
    let seft = this;
    this.service.getDataGiaoHang().subscribe((lst: any)=>{
      seft.giaohang = lst.giaohang;
    })
  }
  
  
}