import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SodoService } from './sodo.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NotificationService } from '../../notification/notification.service';


@Component({
  selector: 'menu-sodo',  
  templateUrl: './sodo.component.html',
  styleUrls: ['./sodo.component.css'],
  providers: [NgbTooltipConfig, NgbTooltipModule],
  encapsulation: ViewEncapsulation.None,
})
export class SodoComponent implements OnInit {

  hinhchuasudung;
  hinhdasudung;
  dlSoDo :any = [];
  closeResult: string;
  listCheckbox={};
  lstmangve = [];
  constructor(
    private service: SodoService, 
    config: NgbTooltipConfig, 
    private _router: Router, 
    private modalService: NgbModal,
    private notification: NotificationService
  ) { 
    config.placement = 'bottom';
    config.triggers = 'click';
  }
  ngOnInit() {
    this.getDataSodo();
    this.service.picBanChuaSD().subscribe((lst: any) => {
      this.hinhchuasudung = lst.hinhban;
    });
    this.service.picBanDaSD().subscribe((lst: any) => {
      this.hinhdasudung = lst.hinhban;
    });
    this.service.socket.on('mangve', ({id,ban, color, thoigian, dathanhtoan}) => {
      if(!dathanhtoan) this.lstmangve.push({ session:id, nameban: ban, ban, status, thoigian });
      else  this.lstmangve=this.lstmangve.filter(e => e.session !== id );
    })
    this.service.socket.on('ban', ({id,ban, color, thoigian}) => {
      this.dlSoDo = this.dlSoDo.map(e => ( ban.indexOf(e.id+"") == -1) ? e : { ...e , session: id, colorActive: color, thoigian });
    });
  }
  changeCheckGhepBan(id){
    if( !!this.listCheckbox[id]) delete this.listCheckbox[id];
    else this.listCheckbox[id] = true;
  }
  saveGhepBan(){
    this.modalService.dismissAll();
    let arrCheck = Object.keys(this.listCheckbox);
    let data = this.dlSoDo.filter(e => arrCheck.indexOf(e.id + "") > -1 )[0];
    let thoigian = moment().format("YYYY-MM-DD HH:mm:ss");
    let nameban = this.dlSoDo.filter(e => arrCheck.indexOf(e.id+ "") > -1 ).map( e => e.name ).join(' ');
    this.service.socket.emit('ghepban', { idArr: arrCheck , color: data.color, session: data.session, thoigian, nameban });
  }
  //get dữ liệu số lượng bàn
  getDataSodo = () => {
    let seft = this;
    this.service.getData().subscribe( (lst: any) => {
      this.service.getSession().subscribe( data => {
        let dataArr = {}
        for (var key in data) {
          if(!!data[key].mangve){
            let dataMV = {...data[key], session: key }
            this.lstmangve.push(dataMV);
          }
          data[key].ban.forEach(e => {
            dataArr[e] = { session: key, color: data[key].color };
          })
        }
        seft.dlSoDo = lst.sodo.map( 
          e => !!dataArr[e.id] ? {...e, session: dataArr[e.id].session, colorActive: dataArr[e.id].color, status: true }: e  )
      })     
    })
  }
  //bấm sử dụng bàn  
  getChonban = (id, color, idsession)=> {
    if(!!idsession ){
      this._router.navigate(['order', idsession]);
    }else{
      let thoigian = moment().format("YYYY-MM-DD HH:mm:ss");
      let nameban = this.dlSoDo.filter(e => e.id === id)[0].name
      this.service.socket.emit('sudungban', { idArr: [ id+"" ], color, thoigian: thoigian, nameban}, (id)=> {
        this._router.navigate(['order', id]);
      });
    }
  }
  dlMod = [];
  //bấm ghép bàn
  open(content, id) {
    this.listCheckbox = { [id]: true};
    this.dlMod = this.dlSoDo.filter( e => (e.id !== id && !e.status))  
    this.modalService.open(content, { size:"lg", centered: true }).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason)
    }
  );
  }
  dlChuyenban = [];
  dataChuyen = {}
  //bấm chuyển bàn
  openChuyenBan(chuyenban, id, session){
    this.dlChuyenban = this.dlSoDo.filter( e => (e.id !== id && !e.status) )
    this.dataChuyen= {
      idChuyen: id,
      sessionChuyen:session
    };
    this.modalService.open(chuyenban, { size:"lg", centered: true }).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });

  }

  chooseChuyen(id){
    let name = this.dlSoDo.filter(e => e.id === id)[0].name
    this.dataChuyen = { ...this.dataChuyen, idDen: id, name }
    this.modalService.dismissAll();
    this.service.socket.emit('chuyenban', this.dataChuyen);
  }

  btnMangVe(tenkh){
    if(tenkh != undefined){
      let thoigian = moment().format("YYYY-MM-DD hh:mm:ss");
      this.service.socket.emit('sudungmangve', { idArr: [ tenkh ], thoigian: thoigian, mangve: 1, nameban: tenkh }, (tenkh)=> {
        this._router.navigate(['order', tenkh]);
      });
    }
    else{
      this.notification.e('error', 'Tên khách hàng không được để trống')
    }
    
  }
  btnDetailMangve(idsession){
    this._router.navigate(['order', idsession]);
  }
  huyBan(idBan, sessionID ){
    this.service.socket.emit('huyban', { idBan, sessionID}, (res) => {
      if(!res) this.notification.e('Lỗi', 'Bàn này không thể hủy')
    } )
  }
}