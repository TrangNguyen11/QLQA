import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent }      from './menu.component';
import { AuthGuard }                from '../auth-guard.service';
import { MonanComponent } from './monan/monan.component';
import { OrderComponent } from './order/order.component';
import { SodoComponent } from './sodo/sodo.component';
import { HoadonComponent } from './hoadon/hoadon.component';


const routes: Routes = [
  {
    path: 'monan',
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: "",
        component: MonanComponent

      }
    ]

  },
  {
    path: "order",    
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: "",
        component: OrderComponent
      }
    ]
  },
  {
    path: "sodo",    
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: "",
        component: SodoComponent

      }
    ]
  },
  {
    path: 'hoadon',    
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: "",
        component: HoadonComponent

      }
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})


export class MenuRoutingModule { 
  
 }
function newFunction(): string {
  return "hoadon";
}

