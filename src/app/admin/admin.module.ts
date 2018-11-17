
import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import {AdminRoutingModule} from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { BanComponent } from './ban/ban.component';
import { BanService } from './ban/ban.service';
import { MonanComponent } from './monan/monan.component';
import { MonanService } from './monan/monan.service';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { NhanvienService } from './nhanvien/nhanvien.service';
import { ThongkeComponent } from './thongke/thongke.component';
import { ThongkeService } from './thongke/thongke.service';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ColorPickerModule } from 'ngx-color-picker';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    BanComponent,
    MonanComponent, 
    NhanvienComponent,
    ThongkeComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgbTooltipModule,
    PerfectScrollbarModule,
    BrowserModule,
    NgxChartsModule,
    BrowserAnimationsModule,
    ColorPickerModule,
  ],
  providers: [
    BanService,
    MonanService,
    NhanvienService,
    ThongkeService,
    NgbTooltipConfig,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: []
})
export class AdminModule { }
