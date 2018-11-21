import { Component, OnInit, Inject } from '@angular/core';
import { DanhmucService } from './danhmuc.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'admin-danhmuc',
  templateUrl: './danhmuc.component.html',
  styleUrls: ['./danhmuc.component.css']
})
export class DanhmucComponent implements OnInit {
  public data:any=[];
  dlDanhmuc = [];
  closeResult: string;
  datainsertdanhmuc = {
    name: '',
  }
  constructor(private service: DanhmucService, 
    private router: Router, 
    private modalService: NgbModal,
    private notification: NotificationService) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
    this.service.getDataDanhmuc().subscribe((lst: any)=>{
      this.dlDanhmuc = lst.name;
    })
  }
  btnDeleteDanhmuc(i){
    this.service.postDeleteDanhmuc( this.dlDanhmuc[i].id).subscribe((lst: any)=>{
      if(lst.name == 1){
        this.dlDanhmuc.splice(i,1);
        this.notification.s('success', `Xóa danh mục ${ this.dlDanhmuc[i].name}  thành công`)
      }else{
        this.notification.e('error', `Xóa danh mục ${ this.dlDanhmuc[i].name}  thất bại`)
      }
    })
  }
  saveUpdateDanhmuc(i){
    this.service.postUpdateDanhmuc(this.dlDanhmuc[i]).subscribe((lst: any)=>{
      if(lst.name == 1){
        this.notification.s('success', `Cập nhật thông tin danh mục ${ this.dlDanhmuc[i].name}  thành công`)
      }else{
        this.notification.e('error', `Cập nhật thông tin danh mục ${ this.dlDanhmuc[i].name}  thất bại`)
      }
    })
  }
  btnDialogInsert(insertdanhmuc){
    this.modalService.open(insertdanhmuc).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveInsertDanhmuc(){
    if(this.datainsertdanhmuc.name === ""){
      this.notification.e('error', `Tên danh mục không được để trống`)
      return true
    }
    this.service.postInserteDanhmuc(this.datainsertdanhmuc)
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
  cancelDanhmuc(){
    this.modalService.dismissAll();
  }
}