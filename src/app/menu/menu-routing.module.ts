import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent }      from './menu.component';
import { AuthGuard }                from '../auth-guard.service';
import { MonanComponent } from './monan/monan.component';
import { OrderComponent } from './order/order.component';
import { SodoComponent } from './sodo/sodo.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { CheckorderComponent } from './checkorder/checkorder.component';
import { BepComponent } from './bep/bep.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  { path: '', 
    redirectTo: '/hoadon', 
    pathMatch: 'full' 
  },
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuComponent,
    children: [
      {
        path: "monan",
        component: MonanComponent
      },
      {
        path: "order/:idsession",
        component: OrderComponent
      },
      {
        path: "sodo",
        component: SodoComponent
      },
      {
        path: "hoadon",
        component: HoadonComponent
      },
      {
        path: "bep",
        component: BepComponent
      },
      {
        path: "checkorder",
        component: CheckorderComponent
      },
      {
        path: "account",
        component: AccountComponent
      },
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

