import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from './account.service';
import { ActivatedRoute, Params } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {Md5} from 'ts-md5/dist/md5';
import { NotificationService } from '../../notification/notification.service';

import * as moment from 'moment';
@Component({
  selector: 'menu-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})

export class AccountComponent implements OnInit {
  @ViewChild('file') file: ElementRef;
  @ViewChild('insertFile') insertFile: ElementRef;
  dataAccount:any = [];
  closeResult: string;

  constructor( 
    private service: AccountService, 
    private route: ActivatedRoute, 
    @Inject(LOCAL_STORAGE) private storage: WebStorageService, 
    private modalService: NgbModal, 
    private notification: NotificationService) { 
  }

  ngOnInit() {
    this.loadDataAccount()
  }  
  loadDataAccount(){
    this.service.getDataAccount(this.storage.get("id")).subscribe((lst: any)=>{
      console.log(lst.result);
      this.dataAccount = lst.result[0]
    })
  }
  changePic=()=>{
    this.file.nativeElement.click();
  }
  onFileChanged(event){
    if (event.target.files.length === 0) return;
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result;
      this.dataAccount.hinh = data;
    };
  }
  btnChangeAccount(change){
    this.modalService.open(change, { size:"lg", centered: true }).result.then(
      (result) => {
      this.closeResult = `Closed with: ${result}`;
    },(reason) => {
      console.log(reason);
    });
  }
  saveAccount = ()=>{
    const md5 = new Md5();
    this.dataAccount.matkhau = md5.appendStr(this.dataAccount.matkhau).end().toString();
    this.service.postUpdateAccount(this.dataAccount).subscribe( 
      (res: any) => res.result === 1 ? this.notification.s('success', `Cập nhật lại tài khoản thành công`): 
      this.notification.s('success', `Cập nhật tài khoản thất bại`) 
    );
    this.modalService.dismissAll();
  }
  cancelAccount = ()=>{
    this.modalService.dismissAll();

  }
   
}