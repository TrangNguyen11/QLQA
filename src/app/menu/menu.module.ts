
import { NgModule } from '@angular/core';
import { MenuRoutingModule } from './menu-routing.module';
import { MonanComponent } from './monan/monan.component';
import { OrderComponent } from './order/order.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {CommonModule} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SodoComponent } from './sodo/sodo.component';
import { SodoService } from './sodo/sodo.service';
import { HoadonService } from './hoadon/hoadon.service';
import { HoadonComponent } from './hoadon/hoadon.component';
import { CheckorderService } from './checkorder/checkorder.service';
import { CheckorderComponent } from './checkorder/checkorder.component';
import { NgbTooltipConfig } from '@ng-bootstrap/ng-bootstrap';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    MonanComponent,
    OrderComponent,
    SodoComponent,
    HoadonComponent,
    CheckorderComponent
   
  ],
  imports: [
    CommonModule,
    MenuRoutingModule,
    FormsModule,
    NgbModule.forRoot(),
    ReactiveFormsModule,
    NgbTooltipModule
   
  ],
  providers: [
    SodoService,
    HoadonService,
    CheckorderService,
    NgbTooltipConfig
    
  ],
  bootstrap: []
})
export class MenuModule { }
