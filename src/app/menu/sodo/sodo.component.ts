import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { SodoService } from './sodo.service';
import {NgbTooltipConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'menu-sodo',
  templateUrl: './sodo.component.html',
  styleUrls: ['./sodo.component.css'],
  providers: [NgbTooltipConfig],
  encapsulation: ViewEncapsulation.None,
})
export class SodoComponent implements OnInit {

  constructor(private service: SodoService, config: NgbTooltipConfig) { 
    config.placement = 'right';
    config.triggers = 'click';
  }

  ngOnInit() {
    this.getDataSodo();
  }
  dlSoDo :any = [];
  getDataSodo = ()=>{
    let seft = this;
    this.service.getData().subscribe((lst: any)=>{
      seft.dlSoDo = lst.sodo;
    })

  }

}