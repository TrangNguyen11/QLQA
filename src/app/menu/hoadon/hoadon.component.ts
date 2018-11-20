import { Component, OnInit } from '@angular/core';
import { HoadonService } from './hoadon.service';
import { ActivatedRoute, Params } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'

@Component({
  selector: 'menu-hoadon',
  templateUrl: './hoadon.component.html',
  styleUrls: ['./hoadon.component.css']
})

export class HoadonComponent implements OnInit {
  constructor(private service: HoadonService, private route: ActivatedRoute, private modalService: NgbModal) {
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
      this.dlhd = { tenban: data[e].nameban, sessionID: e, thoigian: data[e].thoigian, tongtien: data[e].tongtien, monan: data[e].monan, };
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
    let newWindow = window.open('', '_blank', 'top=0,left=0,height=100%,width="50px"');
    newWindow.document.write('<h3 style="text-alight: center;width: 100%">Quán mì cay sasin</h3>')
    newWindow.document.write(document.getElementById('print').innerHTML)
    newWindow.document.write(`<h3 style="text-alight: center;width: 100%">Mã giảm giá: ${ this.makm }</h3>`)
    newWindow.document.write(`<h3 style="text-alight: center;width: 100%">Tổng tiền: ${ this.tongtien }</h3>`)
    newWindow.document.write(`<h3 style="text-alight: center;width: 100%">Số tiền nhận: ${ this.tiennhan }</h3>`)
    newWindow.document.write(`<h3 style="text-alight: center;width: 100%">Tiền thừa: ${ this.getTienNhanLai }</h3>`)

    newWindow.print();
  }
  btnCancel = () => {
    this.modalService.dismissAll();
  }
}