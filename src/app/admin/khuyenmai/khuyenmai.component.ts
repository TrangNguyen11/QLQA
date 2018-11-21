import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { KhuyenMaiService } from './khuyenmai.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'
import { NotificationService } from '../../notification/notification.service';

@Component({
  selector: 'admin-khuyenmai',
  templateUrl: './khuyenmai.component.html',
  styleUrls: ['./khuyenmai.component.css']
})
export class KhuyenMaiComponent implements OnInit {
  public data:any=[];
  dlKhuyenmai = [];
  dlDanhmuc = [];
  hinh = "";
  insertKhuyenmai = {
    id: "",
    chietkhau: "",
    ngaybatdau: "",
    ngayketthuc: ""
  }
  closeResult: string;
  dlUpdate ;
  constructor(
    private service: KhuyenMaiService, 
    private router: Router, 
    private modalService: NgbModal,
    private notification: NotificationService) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
      this.service.getDataKhuyenmai().subscribe((res: any)=>{
      this.dlKhuyenmai = res.khuyenmai;
    })
  }
  btnUpdateKhuyenmai(i){ 
    this.service.postUpdateKhuyenmai(this.dlKhuyenmai[i]).subscribe( 
      (res: any) => res.result === 1 ? this.notification.s('success', `Cập nhật thông tin khuyến mãi ${ this.dlKhuyenmai[i].id}  thành công`)
      : this.notification.e('error', `Cập nhật thông tin khuyến mãi ${ this.dlKhuyenmai[i].id}  thất bại`) )
  }
  btnDeleteKhuyenmai(i){
    this.service.postDeleteKhuyenmai( this.dlKhuyenmai[i].id).subscribe((lst: any)=>{
      if(lst.result == 1){
        this.dlKhuyenmai.splice(i,1);
        this.notification.s('success', `Xóa mã khuyến mãi ${ this.dlKhuyenmai[i].id}  thành công`)
      }else{
        this.notification.e('error', `Xóa mã khuyến mãi ${ this.dlKhuyenmai[i].id}  thất bại`)
      }
    })
  }
  btnInsertKhuyenmai(insertkhuyenmai){
    this.modalService.open(insertkhuyenmai).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveInsertKhuyenmai(){
    if(this.insertKhuyenmai.id === ""){
      this.notification.e('error', `Mã khuyến mãi không được để trống`)
      return true
    }
    if(this.insertKhuyenmai.ngaybatdau === ""){
      this.notification.e('error', `Ngày bắt đầu không được để trống`)
      return true
    }
    if(this.insertKhuyenmai.ngayketthuc === ""){
      this.notification.e('error', `Ngày kết thúc không được để trống`)
      return true
    }
    this.service.checkMaKM(this.insertKhuyenmai.id).subscribe((lst: any)=>{
      if(lst.length === 0){
        this.service.postInserKhuyenmai(this.insertKhuyenmai)
        .subscribe( (res:any) => {
          if(res.result === true){
            this.notification.s('success', `Thêm mã khuyến mãi thành công`)
            this.service.getDataKhuyenmai().subscribe(
              (lst: any) =>{
                this.modalService.dismissAll();
                this.dlKhuyenmai = lst.khuyenmai;
              }
            )
          }else{
            this.notification.e('errors', `Thêm nhân viên thất bại`)
          }
        })
      }
    })
    
  }
  cancelKhuyenmai(){
    this.modalService.dismissAll();
  }
}