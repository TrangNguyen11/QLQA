import { Component, OnInit, Inject } from '@angular/core';
import { BepService } from './bep.service';
import { ActivatedRoute, Params } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'menu-bep',
  templateUrl: './bep.component.html',
  styleUrls: ['./bep.component.css']
})

export class BepComponent implements OnInit {
  dataBep = [];
  dataXong = [];
  keysession;
  constructor( private service: BepService, private route: ActivatedRoute
    , @Inject(LOCAL_STORAGE) private storage: WebStorageService, private modalService: NgbModal) { 
  }
  ngOnInit() {
    this.loadDataBep();
    this.service.socket.on('nauxong', (e)=>{
      this.dataBep = e;
    });
  }  
  loadDataBep(){
    this.service.getDataBep().subscribe((lst:any)=>{
      this.dataBep = lst;
      console.log(this.dataBep);
         // moment.locale('vi');
          //const b = moment(a.timeDat);          
          //console.log(b.startOf('minutes').fromNow());
          //console.log(this.dataBep);
    });
  }
  loadNau(){
    return this.dataBep.filter((e)=> e.status === 0|| e.status === 1);
  }
  loadDaXong(){
    return this.dataBep.filter((e)=> e.status === 2);
  }
  btnXong(data){
    this.service.socket.emit('dataXong', { ...data });
  }
  btnNau(data){
    this.service.socket.emit('dataNau', { ...data });
  }
  checkedBung(data){
    this.service.socket.emit('dataBung', data);
  }
  btnHuy(data){
    this.service.socket.emit('dataHuy', data);
  }
  btnIn(data){
    let newWindow = window.open('', '_blank', 'top=0,left=0,height="100%",width="100%"');
    newWindow.document.write(`<h5 style="text-align: center;">Món ăn: ${data.tenmon}</h5>`)
    newWindow.document.write(`<h6 >${ moment().format("YYYY-MM-DD HH:mm:ss")}</h6>`)

    newWindow.document.write(`<h6>#${data.nameban} <span style="float:right">SL: x${data.soluong}</span></h6>`)
    newWindow.print();  
  }
}