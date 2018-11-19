import { Component, OnInit, Inject } from '@angular/core';
import { DanhmucService } from './danhmuc.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private service: DanhmucService, private router: Router, private modalService: NgbModal) {
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
        alert("Xóa thành công");
      }else{
        alert("Xóa thất bại");
      }
    })
  }
  saveUpdateDanhmuc(i){
    this.service.postUpdateDanhmuc(this.dlDanhmuc[i]).subscribe((lst: any)=>{
      if(lst.name == 1){
        alert("Cập nhật thành công");
      }else{
        alert("Cập nhật thất bại");
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
    this.service.postInserteDanhmuc(this.datainsertdanhmuc)
    .subscribe(
      (res: any) =>{
        if(res.result === true){
          this.loadData();
          this.modalService.dismissAll();
        }
      }
    )
  }
  cancelDanhmuc(){
    this.modalService.dismissAll();
  }
}