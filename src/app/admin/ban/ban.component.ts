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
  dlUpdate ;
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
  btnDeleteBan(data){
    let id = data.id;
    this.service.postDeleteBan(id).subscribe((lst: any)=>{
      console.log(lst);
      if(lst.name == 1){
        this.loadData();
        alert("Xóa thành công");
      }else{
        alert("Xóa thất bại");
      }
    })
  }
  btnUpdateBan(upban, data){ 
    this.dlUpdate = data;
    this.modalService.open(upban).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveUpdateBan(data){
    this.service.postUpdateBan(data).subscribe((lst: any)=>{
      if(lst.name == 1){
        this.loadData();
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
  cancelBan(){
    this.modalService.dismissAll();
  }
}