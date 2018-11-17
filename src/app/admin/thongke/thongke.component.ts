import { Component, OnInit, Inject } from '@angular/core';
import { ThongkeService } from './thongke.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';

@Component({
  selector: 'admin-thongke',
  templateUrl: './thongke.component.html',
  styleUrls: ['./thongke.component.css']
})
export class ThongkeComponent implements OnInit {
  public data: any = [];
  dlThongke = [];
  closeResult: string;
  dlUpdate;
  option = {
    schemeType:'ordinal',
    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: true,
    xAxisLabel: 'Number',
    showYAxisLabel: true,
    yAxisLabel: 'Color Value',
    timeline: false,

    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    multi: [
      
    ]
  } 

  constructor(
    private service: ThongkeService,
    private router: Router,
    private modalService: NgbModal) {
  }
  ngOnInit() {
    this.loadData();
    console.log([...Array(5)].map((item, index) => ({ index })))
  }
  loadData = () => {
    this.service.getDataThongKe().subscribe((lst: any) => {
      this.dlThongke = lst.thongke;
    })
    var day = moment().endOf('month').format('DD');
    console.log(day)
    let arr = [...Array(100)]
    console.log(arr)
    let data = [...arr].map( (e,key) => { return key} )
    // this.option.multi.push(
    //   {
    //     name: 'So luong',
    //     series: 
    //   }
    // );
    console.log(data)
  }
}