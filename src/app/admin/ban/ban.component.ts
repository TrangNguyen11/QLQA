import { Component, OnInit, Inject } from '@angular/core';
import { BanService } from './ban.service';
import { Router } from '@angular/router';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

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
  constructor(private service: BanService, private router: Router, private modalService: NgbModal) {
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
        alert("Xóa thành công");
      }else{
        alert("Xóa thất bại");
      }
    })
  }
  saveUpdateBan(i){
    this.service.postUpdateBan(this.dlBan[i]).subscribe((lst: any)=>{
      if(lst.name == 1){
        alert("Cập nhật thành công");
      }else{
        alert("Cập nhật thất bại");
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
    this.service.postInserteBan(this.insert)
    .subscribe(
      (res: any) =>{
        if(res.result === true){
          this.loadData();
          this.modalService.dismissAll();

        }
      }
    )
  }
  cancelBan(){
    this.modalService.dismissAll();
  }
}