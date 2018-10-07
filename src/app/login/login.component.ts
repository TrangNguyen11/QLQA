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
    
    this.service.login(this.email, this.password)
    .subscribe(
      (reponse)=>{
        this.storage.set("username", this.email);
        this.storage.set("password", this.password);
        this.router.navigateByUrl('');
        console.log(reponse);
      }
    );
    this.router.navigateByUrl('');
  }
}
