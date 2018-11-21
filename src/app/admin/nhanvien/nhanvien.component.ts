import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NhanvienService } from './nhanvien.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'
import {Md5} from 'ts-md5/dist/md5';
import { NotificationService } from '../../notification/notification.service';
@Component({
  selector: 'admin-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit {
  @ViewChild('file') file: ElementRef;
  @ViewChild('insertFile') insertFile: ElementRef;
  public data:any=[];
  dlNhanvien = [];
  closeResult: string;
  dlUpdate ;  
  hinh = "";
  idChangePic = -1;
  insertNhanvien = ({
    hoten: '',
    ngaysinh: '',
    sdt: '',
    diachi: '',
    quyen: '',
    matkhau: '',
    hinh: ''
  });
  constructor(
    private service: NhanvienService, 
    private router: Router, 
    private modalService: NgbModal,
    private notification: NotificationService,
  ){
  }
  ngOnInit() {
    this.loadData();
    
  }
  loadData = () =>{
    forkJoin([ 
      this.service.getDataNhanvien(), 
      this.service.getHinh()
    ])
    .subscribe((res: any)=>{
      this.dlNhanvien = res[0].nhanvien;
      this.hinh = res[1].hinh.filter(e => e.tensudung === 'nhanvienmacdinh' )[0].hinhsudung;
    })
  }
  btnDeleteNhanVien = (i) =>{
    this.service.postDeleteNhanVien(this.dlNhanvien[i]).subscribe((lst: any)=>{
      if(lst.name == 1){
        this.notification.s('success', `Xóa nhân viên ${this.dlNhanvien[i].hoten} thành công`)    
        this.dlNhanvien.splice(i,1);        
      }else{
        this.notification.e('errors', `Xóa nhân viên ${this.dlNhanvien[i].hoten} thất bại`)
      }
    })
  }
  btnInsertNhanVien(insertnhanvien){
    this.modalService.open(insertnhanvien, { size:"lg", centered: true }).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveInsertNhanVien(){
    const md5 = new Md5();
    
    if(this.insertNhanvien.hoten === ""){
      this.notification.e('errors', `Họ tên không được để trống `)
      return true
    }
    if(this.insertNhanvien.quyen === ""){
      this.notification.e('errors', `Vui lòng set quyền cho nhân viên `)
      return true
    }
    if(this.insertNhanvien.matkhau === ""){
      this.notification.e('errors', `Mật khẩu không được để trống`)
      return true
    }
    if(this.insertNhanvien.sdt === ""){
      this.notification.e('errors', `Số điện thoại không được để trống`)
      return true
    }
    this.insertNhanvien.matkhau = md5.appendStr(this.insertNhanvien.matkhau).end().toString();
    this.service.postCheckSDT(this.insertNhanvien.sdt).subscribe((lst:any)=>{
      if(lst.length === 0){
        this.service.postInserteNhanVien(this.insertNhanvien).subscribe(
          (res: any) =>{
            if(res.result === true){
              this.loadData();
              this.notification.s('success', `Thêm nhân viên thành công`)
              this.modalService.dismissAll();
            }else{
              this.notification.e('errors', `Thêm nhân viên thất bại`)
            }
          }
        )
      }else{        
        this.notification.e('errors', `Số điện thoại này đã được sử dụng`)
        return true
      }
    })
    
  }
  changePic(id){
    this.idChangePic = id;
    this.file.nativeElement.click();
  }
  changeInsertPic = ()=>{
      console.log(this.insertFile)
      this.insertFile.nativeElement.click();
  }
  cancelNhanvien = ()=>{
    this.modalService.dismissAll();
  }  
  onFileChanged(event){
    if (event.target.files.length === 0) return;
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result;
      // data = data.slice(data.indexOf(',') + 1);
      this.dlNhanvien[this.idChangePic].hinh = data;
    };
  }
  onFileInsertChanged(event){
    if (event.target.files.length === 0) return;
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result;
      // this.insertNhanvien.hinh = data;
    };
  }
  btnUpdateNhanvien(i){
    this.service.postUpdateNhanVien(this.dlNhanvien[i]).subscribe(
      (res: any) => res.result === 1 ? this.notification.s('success', `Cập nhật thông tin nhân viên ${ this.dlNhanvien[i].hoten} thành công`):
      this.notification.e('errors', `Cập nhật nhân viên ${ this.dlNhanvien[i].hoten } thất bại`) )
  }
}