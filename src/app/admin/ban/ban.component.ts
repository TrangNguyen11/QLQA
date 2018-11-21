import { Component, OnInit, Inject } from '@angular/core';
import { BanService } from './ban.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'admin-ban',
  templateUrl: './ban.component.html',
  styleUrls: ['./ban.component.css']
})
export class BanComponent implements OnInit {
  public data:any=[];
  dlBan = [];
  closeResult: string;
  insert = {
    name: '',
    color: ''
  }
  constructor(
    private service: BanService, 
    private router: Router, 
    private modalService: NgbModal,
    private notification: NotificationService,) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
    this.service.getDataBan().subscribe((lst: any)=>{
      this.dlBan = lst.sodo;
    })
  }
  btnDeleteBan(i){
    this.service.postDeleteBan( this.dlBan[i].id).subscribe((lst: any)=>{
      if(lst.name == 1){
        this.dlBan.splice(i,1);
        this.notification.s('success', `Xóa bàn ${ this.dlBan[i].name}  thành công`)
      }else{
        this.notification.e('error', `Xóa bàn ${ this.dlBan[i].name}  thất bại`)
      }
    })
  }
  saveUpdateBan(i){
    this.service.postUpdateBan(this.dlBan[i]).subscribe((lst: any)=>{
      if(lst.name == 1){
        this.notification.s('success', `Cập nhật thông tin bàn ${ this.dlBan[i].name}  thành công`)
      }else{
        this.notification.e('error', `Cập nhật thông tin bàn ${ this.dlBan[i].name}  thất bại`)
      }
    })
  }
  btnInsertBan(insertban){
    this.modalService.open(insertban).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveInsertBan(){
    if(this.insert.name === ""){
      this.notification.e('error', `Tên bàn không được để trống`)
      return true
    }
    if(this.insert.color === ""){
      this.notification.e('error', `Cột màu không được để trống`)
      return true
    }
    this.service.postInserteBan(this.insert)
    .subscribe(
      (res: any) =>{
        if(res.result === true){
          this.loadData();
          this.notification.s('success', `Thêm bàn thành công`)
          this.modalService.dismissAll();
        }
      }
    )
  }
  cancelBan(){
    this.modalService.dismissAll();
  }
}