import { Component, OnInit, Inject } from '@angular/core';
import { ThongkeService } from './thongke.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as moment from 'moment';
import { NotificationService } from '../../notification/notification.service';

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
  isLoading = false;
  thang = []
  option = {
    schemeType: 'ordinal',
    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: true,
    // xAxisLabel: 'Number',
    showYAxisLabel: true,
    // yAxisLabel: 'Color Value',
    timeline: false,

    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    multi: [

    ]
  }
  isLoadingGio = false;
  tkgio = {
    schemeType: 'ordinal',
    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: true,
    // xAxisLabel: 'Number',
    showYAxisLabel: true,
    // yAxisLabel: 'Color Value',
    timeline: false,
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    multi: [
    ]
  }
  isLoadingMonAn = false;
  tkmonan = {
    schemeType: 'ordinal',
    // options
    showXAxis: true,
    showYAxis: true,
    gradient: false,
    showLegend: false,
    showXAxisLabel: true,
    // xAxisLabel: 'Number',
    showYAxisLabel: true,
    // yAxisLabel: 'Color Value',
    timeline: false,
    colorScheme: {
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    },
    multi: [
    ]
  }
  dlTKMonAn = [];
  selectThang;//moment().months();
  tongTienHoaDon;
  constructor(
    private service: ThongkeService,
    private router: Router,
    private modalService: NgbModal, 
    private notification: NotificationService) {
  }
  ngOnInit() {
    this.loadData();
    this.tkNgay();
    this.tkGio();
    for(var i = 1; i<13 ; i++){
      this.thang.push(i);
    }
    // this.tkMonAn();
  }
  loadData = () => {
    this.service.getDataThongKe().subscribe((lst: any) => {
      this.dlThongke = lst.thongke;
    })
  }
  getSum() : number {
    let sum = 0;
    for(let i = 0; i < this.dlThongke.length; i++) {
      sum += +this.dlThongke[i].sotien
    }
    return sum;
  }
  tkNgay = () => {
    //Thống kê theo tháng
    this.service.getThongKeThang().subscribe((lst: any) => {
      let valueDay = {};
      lst.data.forEach(e => valueDay[e.ngay] = e.tien)
      var day = moment().endOf('month').format('DD');
      let arr = [...Array(+day)].fill(' ')

      let series = arr.map((e, key) => ({
        name: `Ngay ${key + 1}`,
        value: !!valueDay[key + 1] ? valueDay[key + 1] : 0
      }))
      this.option.multi.push(
        {
          name: 'Tổng tiền',
          series
        }
      );
      this.isLoading = true;
    })
  }
  tkGio = () => {
    //Thống kê theo giờ
    this.service.getThongKeGio().subscribe((lst: any) => {
      let valueDay = {};
      lst.data.forEach(e => valueDay[e.gio] = e.dem)
      let arr = [...Array(24)].fill(' ')
      let series = arr.map((e, key) => ({
        name: `${key} Giờ `,
        value: !!valueDay[key] ? valueDay[key] : 0
      }))
      this.tkgio.multi.push(
        {
          name: 'Số lượng',
          series
        }
      );
      this.isLoadingGio = true;
    })
  }
  tkMonAn = () => {
    //Thống kê theo món ăn
    this.service.getThongKeMonAn().subscribe((lstdata: any) => {
      this.service.getMonAn().subscribe((lst: any) => {
        lst.data.forEach((e) => {
          this.dlTKMonAn[e.tenmon] = e.tenmon
        })
        let valueDay = {};
        lstdata.data.forEach(e => valueDay[e.tenmon] = e.demmon)
        console.log(valueDay)
        console.log(this.dlTKMonAn)
        let series = this.dlTKMonAn.map((e, key) => ({
          name: e,
          value: !!valueDay[key] ? valueDay[key] : 0
        }))
        console.log(series)
        this.tkmonan.multi.push(
          {
            name: 'Thời gian',
            series
          }
        );
      });
      this.isLoadingMonAn = true;
    })
  }
  btnExport = () =>{
    this.service.exportAsExcelFile(this.dlThongke, 'hoadon');
  }
  onChange = () => {
    console.log(this.selectThang)
    var dlChange = [];
    if(this.selectThang == 0 ){
      this.service.getDataThongKe().subscribe((lst: any) => {
        this.dlThongke = lst.thongke;
        console.log(this.dlThongke);
      })
    }else if(this.selectThang != undefined){
      this.service.changeSelectTK(this.selectThang).subscribe((lst: any)=>{
        this.dlThongke = lst.result;
      });
    }
    else{
      this.dlThongke = this.dlThongke;
    }
  }
}