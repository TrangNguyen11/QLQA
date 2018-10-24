
import { NgModule } from '@angular/core';
import { MenuRoutingModule } from './menu-routing.module';
import { MonanComponent } from './monan/monan.component';
import { OrderComponent } from './order/order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { SodoComponent } from './sodo/sodo.component';
import { SodoService } from './sodo/sodo.service';
import { HoadonService } from './hoadon/hoadon.service';
import { HoadonComponent } from './hoadon/hoadon.component';
import { CheckorderService } from './checkorder/checkorder.service';
import { CheckorderComponent } from './checkorder/checkorder.component';
import { BepService } from './bep/bep.service';
import { BepComponent } from './bep/bep.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    MonanComponent,
    OrderComponent,
    SodoComponent,
    HoadonComponent,
    CheckorderComponent,
    BepComponent
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgbTooltipModule,
    PerfectScrollbarModule
  ],
  providers: [
    SodoService,
    HoadonService,
    CheckorderService,
    NgbTooltipConfig,
    BepService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }

  ],
  bootstrap: []
})
export class MenuModule { }
