import { Component, OnInit, Inject } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

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
  constructor(private service: LoginService, private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService,
  private formBuilder: FormBuilder) {

  }
  ngOnInit() {
    // this.registerForm = this.formBuilder.group({
    //   email: ['', [Validators.required, Validators.email]],
    //   password: ['', [Validators.required, Validators.minLength(6)]]
    // });
  }  
  email;
  password;
  
  btnlogin(){    
    this.service.login(this.email, this.password).subscribe(
      (reponse)=>{
        if(reponse.login.length > 0){
          this.storage.set("id", reponse.login[0].id);
          this.storage.set("username", reponse.login[0].sdt);
          this.storage.set("password", reponse.login[0].matkhau);
          var quyen = reponse.login[0].quyen;
          if(quyen == 0){
            this.router.navigateByUrl('');
          }else{
            this.router.navigateByUrl('admin');
          }          
        }else{
          this.router.navigateByUrl('login');
        }
      }
    );
  }
}
