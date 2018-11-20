import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable()
export class NotificationService {

  constructor(private toastr: ToastrService) {}
  
  s( title ="", body =""){
    this.toastr.success( body, title );
  }

  e( title ="", body =""){
    this.toastr.error( body, title );
  }

  i( title ="", body =""){
    this.toastr.info( body, title );
  }

  w( title ="", body =""){
    this.toastr.warning( body, title );
  }
}