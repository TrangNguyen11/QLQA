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
  dlMangVe = [];
  dlThanhToan = [];
  closeResult: string;
  dlhd;
  tongtien ;
  chitietmonan = [];
  tientungban;
  sessionIDThanhToan;
  dataInsertThanhToan;
  ngOnInit() {
    //load data
    this.sub = this.route.params.subscribe(params => {
      this.service.getSession().subscribe( (lst:any) =>{
        this.dataSession = {...lst[params.idsession] , id: params.idsession}
        this.dlThanhToan = !!this.dataSession.monan ? this.dataSession.monan: [] ;
      });
    });
    this.service.getSession().subscribe( (lst:any) =>{
      this.dlHoaDon = [];
      this.dlMangVe = [];
      console.log(lst);
      Object.keys(lst).forEach((e)=>{
        if(!lst[e].mangve){
          if(!!lst[e].monan){
            this.tongtien = lst[e].monan[0].tongtien;
            this.dlhd = { tenban:lst[e].monan[0].nameban, sessionID: e, thoigian: lst[e].thoigian, tongtien: lst[e].monan[0].tongtien }
            this.dlhd = {...this.dlhd, chitietmonan: lst[e].monan, tongtienchitiet: this.tongtien  }
            this.dlHoaDon.push(this.dlhd);
          }
        }else{
          if(!!lst[e].monan){
            this.tongtien = lst[e].monan[0].tongtien;
            this.dlhd = { tenban:lst[e].monan[0].nameban, sessionID: e, thoigian: lst[e].thoigian, tongtien: lst[e].monan[0].tongtien }
            this.dlhd = {...this.dlhd, chitietmonan: lst[e].monan, tongtienchitiet: this.tongtien, mangve: 11  }
            this.dlMangVe.push(this.dlhd);
          }
        }        
      });
    });
    this.service.socket.on('thanhtoanxong', (data)=>{
      this.dlHoaDon = [];
      this.dlMangVe = [];
      Object.keys(data).forEach((e)=>{
        if(!data[e].mangve){
          if(!!data[e].monan){
            this.tongtien = data[e].monan[0].tongtien;
            this.dlhd = { tenban:data[e].monan[0].nameban, sessionID: e, thoigian: data[e].thoigian, tongtien: data[e].monan[0].tongtien }
            this.dlhd = {...this.dlhd, chitietmonan: data[e].monan, tongtienchitiet: this.tongtien  }
            this.dlHoaDon.push(this.dlhd);
          }
        }else{
          if(!!data[e].monan){
            this.tongtien = data[e].monan[0].tongtien;
            this.dlhd = { tenban:data[e].monan[0].nameban, sessionID: e, thoigian: data[e].thoigian, tongtien: data[e].monan[0].tongtien }
            this.dlhd = {...this.dlhd, chitietmonan: data[e].monan, tongtienchitiet: this.tongtien  }
            this.dlMangVe.push(this.dlhd);
          }
        }
      });
    });
    
  }
  openthanhtoan = (thanhtoanhd, data) => {
    this.dataInsertThanhToan = data;
    this.sessionIDThanhToan = data.sessionID;
    this.chitietmonan = data.chitietmonan;
    this.tientungban = data.tongtien;
    this.modalService.open(thanhtoanhd).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  btnThanhToanDialog = (idsession)=>{
    console.log(this.dataInsertThanhToan);
    let dlInsertChitiet = this.dataInsertThanhToan.chitietmonan.map(e => {
      let { id, dongia ,soluong , manhanvien } = e;      
      return ({ id:null, idmonan: id, gia: dongia, soluong: soluong, tenkh: "a", 
         idnhanvien: manhanvien,datetimedatmon: this.dataInsertThanhToan.thoigian, idsession: this.dataInsertThanhToan.sessionID
         });
    });
    let dlInsertHoaDon = {
      id: this.dataInsertThanhToan.sessionID, datedt: this.dataInsertThanhToan.thoigian, sotien: this.dataInsertThanhToan.tongtien};
    this.service.insertChiTietDM(dlInsertChitiet).subscribe((lst: any) => {
      if(lst.count == true){
        alert("Gửi thành công");
      }else{
        alert("Gửi thất bại");
      }
    });
    this.service.insertHoaDon(dlInsertHoaDon).subscribe((lst: any) => {
      if(lst.count == true){
        alert("Gửi thành công");
      }else{
        alert("Gửi thất bại");
      }
    });
    this.service.socket.emit('thanhtoan', idsession);
    this.modalService.dismissAll();
  }
}