import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SodoService } from './sodo.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

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
  constructor(private service: SodoService, config: NgbTooltipConfig, private _router: Router) { 
    config.placement = 'auto';
    config.triggers = 'click';
  }
  ngOnInit() {
    this.getDataSodo();
    this.service.picBanChuaSD().subscribe((lst: any)=>{
      this.hinhchuasudung = lst.hinhban;
    });
    this.service.picBanDaSD().subscribe((lst: any)=>{
      this.hinhdasudung = lst.hinhban;
    });

    this.service.socket.on('ban', ({id,ban})=>{
      this.dlSoDo = this.dlSoDo.map(e => ( ban.indexOf(e.id+"") == -1) ? e : {...e , status:true});
    })
  }
  //get dữ liệu số lượng bàn
  getDataSodo = ()=>{
    let seft = this;
    this.service.getData().subscribe((lst: any)=>{

      seft.dlSoDo = lst.sodo;
    })
  }
  tenban;
  //bấm sử dụng bàn  
  getChonban = (id)=>{
    this.service.socket.emit('sudungban', [ id+"" ]);
    this._router.navigate(['order', { idban: id }]);
  }
  //bấm ghép bàn


}