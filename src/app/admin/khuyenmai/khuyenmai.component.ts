import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { KhuyenMaiService } from './khuyenmai.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { forkJoin } from 'rxjs'
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
  constructor(private service: KhuyenMaiService, private router: Router, private modalService: NgbModal) {
  }
  ngOnInit() {
    this.loadData();
  }
  loadData = () =>{
      this.service.getDataKhuyenmai().subscribe((res: any)=>{
        console.log(res);
      this.dlKhuyenmai = res.khuyenmai;
    })
  }
  btnUpdateKhuyenmai(i){ 
    this.service.postUpdateKhuyenmai(this.dlKhuyenmai[i]).subscribe( (res: any) => res.result === 1 ? alert('xong'): alert('lỗi') )
  }
  btnDeleteKhuyenmai(i){
    this.service.postDeleteKhuyenmai( this.dlKhuyenmai[i].id).subscribe((lst: any)=>{
      if(lst.result == 1){
        this.dlKhuyenmai.splice(i,1);
        alert("Xóa thành công");
      }else{
        alert("Xóa thất bại");
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
    console.log(this.insertKhuyenmai);
    this.service.postInserKhuyenmai(this.insertKhuyenmai)
    .subscribe( (res:any) => {
      if(res.result === true){
        this.service.getDataKhuyenmai().subscribe(
          (lst: any) =>{
            this.modalService.dismissAll();
            this.dlKhuyenmai = lst.khuyenmai;
          }
        )
      }
    })
  }
  cancelKhuyenmai(){
    this.modalService.dismissAll();
  }
}