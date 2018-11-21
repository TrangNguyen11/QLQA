import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';
import { NotificationService } from '../notification/notification.service';
import {Md5} from 'ts-md5/dist/md5';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public data:any=[];
  // formdata;
  submitted = false;
  registerForm: FormGroup;
  constructor(
    private service: LoginService, 
    private router: Router, 
    @Inject(LOCAL_STORAGE) private storage: WebStorageService,
    private formBuilder: FormBuilder,
    private notification: NotificationService,) {

  }
  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }  
  email = "";
  password = "";  
  btnlogin(){
    const md5 = new Md5();
    console.log(md5.appendStr(this.password).end().toString());
    if(this.email == "" && this.password == ""){
      this.notification.e('error', 'Tên đăng nhập và mật khẩu không được để trống')
    }else
    if(this.email == ""){
      this.notification.e('error', 'Tên đăng nhập không được để trống')
    }else if(this.password == ""){
      this.notification.e('error', 'Password không được để trống')
    }else{
      this.service.login(this.email, this.password).subscribe(
        (reponse)=>{
          if(reponse.login.length > 0){
            this.storage.set("id", reponse.login[0].id);
            this.storage.set("username", reponse.login[0].sdt);
            this.storage.set("password", reponse.login[0].matkhau);
            this.storage.set("quyen", reponse.login[0].quyen);
            this.storage.set("hoten", reponse.login[0].hoten);
            var quyen = reponse.login[0].quyen;
            if(quyen == 4){
              this.router.navigateByUrl('');
            }else if(quyen == 1){
              this.router.navigateByUrl('admin');
            }else if(quyen == 2){
              this.router.navigateByUrl('bep');
            }else if(quyen == 3){
              this.router.navigateByUrl('thanhtoan');
            }
            else{
              this.router.navigateByUrl('admin');
            }
            this.notification.s('success', 'Đăng nhập thành công')         
          }else{
            this.notification.e('error', 'Tên đăng nhập hoặc Password không đúng')
            this.router.navigateByUrl('login');
          }
        }
      );
    }    
  }
}
