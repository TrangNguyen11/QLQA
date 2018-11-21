import { Component, OnInit, Inject } from '@angular/core';
import { HoadonService } from './hoadon.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import * as moment from 'moment';

@Component({
  selector: 'menu-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})

export class HoadonComponent implements OnInit {
  constructor(
    private service: HoadonService, 
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private route: ActivatedRoute, 
    private modalService: NgbModal) {
  }
  public sub: any;
  dataSession;
  dlHoaDon = [];
  dlMangVe = [];
  chietkhau = 0;
  closeResult: string;
  dlhd;
  tongtien;
  chitietmonan = [];
  sessionIDThanhToan;
  dataInsertThanhToan;
  makm;
  tongkm;
  tiennhan;
  ngOnInit() {
    this.service.getSession().subscribe((lst: any) => {
      this.setDlHoaDon(lst);
    });
    this.service.socket.on('thanhtoanxong', (data) => {
      this.setDlHoaDon(data);
    });
  }
  setDlHoaDon = (data) => {
    this.dlHoaDon = [];
    this.dlMangVe = [];
    Object.keys(data).forEach((e) => {
      this.dlhd = { tenban: data[e].nameban, sessionID: e, thoigian: data[e].thoigian, tongtien: data[e].tongtien, 
        monan: data[e].monan, tennv:this.storage.get("hoten")};
      if(!data[e].dathanhtoan){
        if (!!data[e].mangve) {
          this.dlhd.mangve = 1;
          this.dlMangVe.push(this.dlhd);
        } else {
          this.dlHoaDon.push(this.dlhd);
        }
      }      
    });
  }
  openthanhtoan = (thanhtoanhd, data) => {
    this.dataInsertThanhToan = data;
    this.sessionIDThanhToan = data.sessionID;
    this.chitietmonan = data.monan;
    this.tongtien = data.tongtien
    // this.tientungban = data.tongtien;
    this.modalService.open(thanhtoanhd).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        console.log(reason);
      });
  }
  btnThanhToanDialog = (idsession) => {
    let dlInsertChitiet = this.dataInsertThanhToan.monan.map(e => {
      let { id, dongia, soluong, manhanvien } = e;
      return ({
        id: null, idmonan: id, gia: dongia, soluong: soluong,
        idnhanvien: manhanvien, datetimedatmon: this.dataInsertThanhToan.thoigian, idsession: this.dataInsertThanhToan.sessionID
      });
    });
    let dlInsertHoaDon = {
      id: this.dataInsertThanhToan.sessionID, datedt: this.dataInsertThanhToan.thoigian, sotien: this.showTien, makm: this.chietkhau !== 0 ? this.makm : ''
    };
    forkJoin([
      this.service.insertChiTietDM(dlInsertChitiet),
      this.service.insertHoaDon(dlInsertHoaDon)])
      .subscribe((res: any) => {
        if (res[0].count > 0 && res[1].count > 0) alert("Thanh toán thành công");
        else alert("Thanh toán thất bại");
      })
    this.service.socket.emit('thanhtoan', idsession);
    this.modalService.dismissAll();
  }
  onkhuyenmai = () => {
    this.service.checkKhuyenMai(this.makm)
      .subscribe((lstDM: any) => {
        this.chietkhau = 0;
        if (lstDM.khuyenmai.length > 0) {
          this.chietkhau = lstDM.khuyenmai[0].chietkhau
        }
      });
  }
  get showTien() {
    if (this.chietkhau === 0) return this.tongtien;
    if (this.chietkhau <= 100) {
      return (this.tongtien * (1 - this.chietkhau / 100))
    } else {
      return (this.tongtien - this.chietkhau)
    }
  }
  get getTienNhanLai() {
    let tienthoi = this.tongtien;
    if (this.chietkhau !== 0) {
      tienthoi = this.chietkhau <= 100 ? (tienthoi * (1 - this.chietkhau / 100)) : (this.tongtien - this.chietkhau)
    }
    return this.tiennhan - tienthoi;
  }
  btnIn = () => {
    let newWindow = window.open('', '_blank', 'top=0,left=0,height="100%",width="100%"');
    newWindow.document.write('<h3 style="text-align: center;">Quán mì cay sasin</h3>')
    newWindow.document.write('<h5 style="text-align: center;">Hotline: 0393939393</h5>')
    newWindow.document.write('<h3 style="text-align: center;">Hóa đơn thanh toán</h3>')
    newWindow.document.write(`<h6 style="text-align: center;">#${this.sessionIDThanhToan}</h6>`)
    newWindow.document.write(`<h6 style="text-align: center;">#${ moment().format("YYYY-MM-DD HH:mm:ss")}</h6>`)
    newWindow.document.write(`<div style="text-align: center;>${document.getElementById('print').innerHTML}<div>`)
    newWindow.document.write(`<h5 style="text-align: center;width: 100%">Mã giảm giá: ${ this.makm === undefined? "": this.makm }</h5>`)
    newWindow.document.write(`<h3 style="text-align: center;width: 100%">Tổng tiền: ${ this.tongtien !== undefined ? this.tongtien: 0 }</h3>`)
    newWindow.document.write(`<h5 style="text-align: center;width: 100%">Số tiền nhận: ${ this.tiennhan !== undefined ? this.tiennhan: 0 }</h5>`)
    newWindow.document.write(`<h5 style="text-align: center;width: 100%">Tiền thừa: ${ this.getTienNhanLai === NaN ? 0:this.getTienNhanLai}</h5>`)
    newWindow.document.write(`<h6 style="text-align: center;width: 100%">Cám ơn quý khách!</h6>`)
    newWindow.document.write(`<h6 style="text-align: center;width: 100%">360B Lê Văn Sỹ, Tân Bình</h6>`)
    newWindow.print();
  }
  btnCancel = () => {
    this.modalService.dismissAll();
  }
}