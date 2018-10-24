import { Component, OnInit, Inject } from '@angular/core';
import { BepService } from './bep.service';
import { ActivatedRoute, Params } from '@angular/router';
import {LOCAL_STORAGE, WebStorageService} from 'angular-webstorage-service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
@Component({
  selector: 'menu-bep',
  templateUrl: './bep.component.html',
  styleUrls: ['./bep.component.css']
})

export class BepComponent implements OnInit {
  constructor( private service: BepService, private route: ActivatedRoute
    , @Inject(LOCAL_STORAGE) private storage: WebStorageService, private modalService: NgbModal) { 
  }
  ngOnInit() {
    this.loadDataBep();
  }
  dataBep = [];
  loadDataBep(){
    this.service.getDataBep().subscribe((lst:any)=>{
      this.dataBep = lst;
         // moment.locale('vi');
          //const b = moment(a.timeDat);          
          //console.log(b.startOf('minutes').fromNow());
          //console.log(this.dataBep);
    });
  }
  btnXong(data){
    this.service.socket.emit('dataXong', { ...data });
  }

}