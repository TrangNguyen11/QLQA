import { Injectable, Inject }     from '@angular/core';
import { CanActivate, Router,ActivatedRouteSnapshot }    from '@angular/router';
import { LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router ,@Inject(LOCAL_STORAGE) private storage: WebStorageService, ){

  }

  canActivate(route: ActivatedRouteSnapshot) {
    console.log(route)
      if(!this.storage.get('username') || !this.storage.get('password')){
        this.router.navigate(['login']);
        return false;
      }
      let data ={sodo: [1,3,4], bep: [1,2,3], hoadon: [1,3,5], account: [1,2,3,4,5],'order/:idsession':[1,3,4] };
      if(!!data[route.routeConfig.path] && data[route.routeConfig.path].indexOf(this.storage.get('quyen'))!== -1) return true;
      this.router.navigate(['loi']); 
      return false;              
  }
}