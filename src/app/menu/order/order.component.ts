import { Component, OnInit, Inject } from '@angular/core';
import { OrderService } from './order.service';
import { ActivatedRoute, Params } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { SodoService } from '../sodo/sodo.service';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'menu-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  constructor( private service: OrderService, private route: ActivatedRoute, private sodoservice: SodoService,
     @Inject(LOCAL_STORAGE) private storage: WebStorageService, private modalService: NgbModal, private _router: Router) { 
  }
  idban :string ;
  nameBan = "" ;
  dataSession;
  public sub: any;
  closeResult: string;
  dateTimeDefaul;
  data :any = [];
  danhmuc;
  monanhanquoc : any = [];
  dlDatMon :any = [];
  dlDat :any = [];
  lstBan ;
  btnGuiBepVe = "" ;
  ngOnInit() {
    this.getDataOrder();
    this.sub = this.route.params.subscribe(params => {
        this.service.getSession().subscribe( (lst:any) =>{
          console.log(lst);
          this.dataSession = {...lst[params.idsession] , id: params.idsession}
          this.dlDatMon = !!this.dataSession.monan ? this.dataSession.monan: [] ;
          if(!! this.dataSession.color){
            if(!! this.dataSession.ban){
              this.dataSession.ban.forEach((e)=>{
                this.service.getName(e).subscribe( (lst:any) =>{
                  this.nameBan += lst.name.name + "  ";
                });
              });
            }
          }else{
            this.dataSession.ban.forEach((e)=>{
                this.nameBan = e;
            });
          }          
        });
    });
    this.service.socket.on('order', ({sessionID, monan})=>{
      if(sessionID === this.dataSession.id )this.dlDatMon = monan;
    });
  }

  //món ăn hay dùng
  getDataOrder(){
    this.service.getDanhMuc()
    .subscribe( (lstDM:any) => {
      this.service.getData()
      .subscribe( (lst: any) => {
        this.data = lst.monan;
        this.danhmuc = lstDM.danhmuc;
      })
    })
  }
  getListMonAn(key){
    return this.data.filter( e=> e.iddanhmuc === key)
  }
  // totaltien = 0;
  //Tính tổng tiền
  tongtien(){
    let tongtien = 0;
    if(this.dlDatMon.length === 0) return 0
    this.dlDatMon.map((e)=>{
      if(e.status != 4){
        tongtien = tongtien + e.dongia * e.soluong
      }
    });
    // let tongtien = this.dlDatMon.reduce( (total, current) => {
    //   total = isNaN(total) ? total.dongia * total.soluong : total
    //  return  (current.status !== 4) ? total + current.dongia * current.soluong : total  
    // } )
    return tongtien;
  }
  //Click button đặt món
  datMon(i){
    let { hinh, ...rest} = i
    //this.dlDatMonTotal = [...this.data, ...this.micay, ...this.anvat, ...this.lau, ...this.monanhanquoc, ...this.combo, ...this.douong];
    // console.log(this.data);
    let dl = {...rest};
    // let key;
    // let data = this.dlDatMon.filter((e, keyE) => {
    //   let res = e.id === dl.id;
    //   if(res) key = keyE;
    //   return res
    // });
    // data.length === 0 ? this.dlDatMon.push( {...dl, soluong: 1}) : this.dlDatMon[key].soluong++;
    dl.soluong =1
    let dem = -1;
    // let tongtien = 0;
    this.dlDatMon.forEach(  (e,key)=>{      
      if(e.id == dl.id && e.status === undefined){
        dem = key;
      }
    });
    if(dem === -1){
      this.dlDatMon.unshift({...dl});
    }else{
      this.dlDatMon[dem].soluong++;
    }
    // this.dlDat.push({...this.dlDatMon, tongtien: tongtien});
    //console.log(this.dlDat);
  }
  //remove món ăn đã chọn
  deleteItem(datmon){
    for(let i=0 ;i<= this.dlDatMon.length ;i++){
      if(datmon == this.dlDatMon[i]){
       this.dlDatMon.splice(i,1)
      }
     }
  }
  //btn gui bep 
  btnGuiBep(){
    let monan = this.dlDatMon.map( e=> (e.status === undefined ? {...e, nameban: this.nameBan,
       manhanvien:this.storage.get("id") } : e ));
    this.sodoservice.socket.emit('dataDatMon', {sessionID: this.dataSession.id, monan, tongtien: this.tongtien()})
    // totalDatmon = totalDatmon.map(e => {
    //   let { id, dongia, soluong} = e;      
    //   return ({ id:null, idmonan: id, idban: 1, gia: dongia, soluong: soluong, tenkh: "a", 
    //   trangthai: 0, idnhanvien: this.storage.get("id")})
    // });
    // this.service.insertChiTietDM(totalDatmon).subscribe((lst: any) => {
    //   if(lst.count == true){
    //     alert("Gửi thành công");
    //   }else{
    //     alert("Gửi thất bại");
    //   }
    // });
  }
  //open dialog tinh tien 
  openthanhtoan(thanhtoan, id){    
    this.modalService.open(thanhtoan).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason)
    }
  );
  }
  //btn tính tiền
  btnTinhTien(idban){
    console.log(idban);
  }
  //mang ve dialog 
}
