import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { NhanvienService } from './nhanvien.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'
import {Md5} from 'ts-md5/dist/md5';
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
  insertNhanvien = {
    hoten: '',
    ngaysinh: '',
    sdt: '',
    diachi: '',
    quyen: '',
    matkhau: '',
    hinh: ''
  }
  hinh = "";
  idChangePic = -1;

  constructor(private service: NhanvienService, private router: Router, private modalService: NgbModal) {
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
        this.dlNhanvien.splice(i,1);
        alert("Xóa thành công");
      }else{
        alert("Xóa thất bại");
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
    this.insertNhanvien.matkhau = md5.appendStr(this.insertNhanvien.matkhau).end().toString();
    this.service.postInserteNhanVien(this.insertNhanvien)
    .subscribe(
      (res: any) =>{
        if(res.result === true){
          this.loadData();
          this.modalService.dismissAll();
        }
      }
    )
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
      this.insertNhanvien.hinh = data;
    };
  }
  btnUpdateNhanvien(i){ 
    this.service.postUpdateNhanVien(this.dlNhanvien[i]).subscribe( (res: any) => res.result === 1 ? alert('Cập nhật thành công'): alert('Cập nhật lỗi') )
  }
}