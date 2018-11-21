import { Injectable, Inject }     from '@angular/core';
import { CanActivate, Router }    from '@angular/router';
import { LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, @Inject(LOCAL_STORAGE) private storage: WebStorageService){

  }
  canActivate() {
    if(this.storage.get("username") && this.storage.get("password")){
      return true;
    }else{
      this.router.navigate(['login']);
      return false;
    }    
  }
}