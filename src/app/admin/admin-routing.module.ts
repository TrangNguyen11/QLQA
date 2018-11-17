import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard }                from '../auth-guard.service';
import { BanComponent } from './ban/ban.component';
import { MonanComponent } from './monan/monan.component';
import { AdminComponent } from './admin.component';
import { NhanvienComponent } from './nhanvien/nhanvien.component';
import { ThongkeComponent } from './thongke/thongke.component';


const routes: Routes = [
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent,
    children: [
      {
        path: "ban",
        component: BanComponent

      },
      {
        path: "monan",
        component: MonanComponent
      },
      {
        path: "nhanvien",
        component: NhanvienComponent
      },
      {
        path: "thongke",
        component: ThongkeComponent
      },
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})


export class AdminRoutingModule { 
  
 }

