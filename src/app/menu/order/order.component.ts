import { Component, OnInit } from '@angular/core';
import { OrderService } from './order.service';
@Component({
  selector: 'menu-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
  constructor( private service: OrderService ) { 
  }
  ngOnInit() {
    this.getDataOrder();
    this.getMicay();
    this.getLau();
    this.getCombo();
    this.getAnvat();
    this.getDouong();
    this.getMonanhanquoc();
  }
  data :any = [];
  micay :any = [];
  lau :any = [];
  combo :any = [];
  anvat :any = [];
  douong :any = [];
  monanhanquoc : any = [];
  dlDatMon :any = [];
  dlDatMonTotal : any = [];
  dlDat :any = [];
  //món ăn hay dùng
  getDataOrder(){
    let self = this;
    this.service.getData()
    .subscribe( (lst: any) => {
      self.data = lst.monan;
    })
  }
  //món mì cay
  getMicay(){
    let seft = this;
    this.service.getDataMicay()
    .subscribe( (lst: any) => {
      seft.micay = lst.monan;
    })
  }
  //món ăn hàn quốc
  getMonanhanquoc(){
    let seft = this;
    this.service.getMonanhq().subscribe((lst: any) => {
      seft.monanhanquoc = lst.mahq;
    });
  }
  // lẩu 
  getLau(){
    let seft = this;
    this.service.getDataLau()
    .subscribe( (lst: any) => {
      seft.lau = lst.lau;
    })
  }
  //combo
  getCombo(){
    let seft = this;
    this.service.getDataCombo()
    .subscribe( (lst: any) => {
      seft.combo = lst.combo;
    })
  }
  // ăn vặt
  getAnvat(){
    let seft = this;
    this.service.getDataAnvat()
    .subscribe( (lst: any) => {
      seft.anvat = lst.anvat;
    })
  }
  //đồ uống
  getDouong(){
    let seft = this;
    this.service.getDataDouong()
    .subscribe( (lst: any) => {
      seft.douong = lst.douong;
    })
  }
  // totaltien = 0;
  //Tính tổng tiền
  tongtien(){
    let tongtien = 0;
    console.log(this.dlDatMon);
    this.dlDatMon.forEach((e, key)=>{
      tongtien += e.dongia * e.soluong;
    });
    return tongtien;
  }
  //Click button đặt món
  datMon(i){
    //this.dlDatMonTotal = [...this.data, ...this.micay, ...this.anvat, ...this.lau, ...this.monanhanquoc, ...this.combo, ...this.douong];
    // console.log(this.data);
    let dl = {...i};
    // let key;

    // let data = this.dlDatMon.filter((e, keyE) => {
    //   let res = e.id === dl.id;
    //   if(res) key = keyE;
    //   return res
    // });
    // data.length === 0 ? this.dlDatMon.push( {...dl, soluong: 1}) : this.dlDatMon[key].soluong++;
    dl.soluong =1
    let dem = -1;
    let tongtien = 0;
    this.dlDatMon.forEach(  (e,key)=>{      
      if(e.id == dl.id){
        dem = key;
      }
    });
    if(dem === -1){
      this.dlDatMon.unshift(dl);
    }else{
      this.dlDatMon[dem].soluong++;
    }
    
    this.dlDat.push({...this.dlDatMon, tongtien: tongtien});
    console.log(this.dlDat);
  }
  //remove món ăn đã chọn
  deleteItem(datmon){
    for(let i=0 ;i<= this.dlDatMon.length ;i++){
      if(datmon == this.dlDatMon[i]){
       this.dlDatMon.splice(i,1)
      }
     }
  }
}
