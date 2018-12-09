import { Component, OnInit, Inject, ViewChild, ElementRef } from '@angular/core';
import { AccountService } from './account.service';
import { ActivatedRoute, Params } from '@angular/router';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Md5 } from 'ts-md5/dist/md5';
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
  dataAccount: any = [];
  closeResult: string;
  mk = {
    oldmk: '',
    newmk: '',
    renewmk: ''
  }
  constructor(
    private service: AccountService,
    private route: ActivatedRoute,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private notification: NotificationService) {
  }

  ngOnInit() {
    this.loadDataAccount()
  }
  loadDataAccount() {
    this.service.getDataAccount(this.storage.get("id")).subscribe((lst: any) => {
      console.log(lst.result);
      this.dataAccount = lst.result[0]
    })
  }
  changePic = () => {
    this.file.nativeElement.click();
  }
  onFileChanged(event) {
    if (event.target.files.length === 0) return;
    let file = event.target.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let data = reader.result;
      this.dataAccount.hinh = data;
    };
  }

  saveInfoAccount = () => {
    // const md5 = new Md5();
    // this.dataAccount.matkhau = md5.appendStr(this.dataAccount.matkhau).end().toString();
    this.service.postUpdateAccount(this.dataAccount).subscribe(
      (res: any) => res.result === 1 ? this.notification.s('success', `Cập nhật lại tài khoản thành công`) :
        this.notification.e('error', `Cập nhật tài khoản thất bại`)
    );
  }
  savePassAccount = () => {
    let { oldmk, newmk,  renewmk } = this.mk;
    if (new Md5().appendStr(oldmk).end().toString() == this.dataAccount.matkhau && newmk === renewmk) {
      const md5 = new Md5();
      this.dataAccount.matkhau = md5.appendStr(newmk).end().toString();
      this.service.postUpdateAccount(this.dataAccount).subscribe(
        (res: any) => res.result === 1 ? this.notification.s('success', `Cập nhật lại tài khoản thành công`) :
          this.notification.e('error', `Cập nhật tài khoản thất bại`)
      );
    }
    else this.notification.e('error', `dữ liệu nhập vào không đúng`)
  }

}