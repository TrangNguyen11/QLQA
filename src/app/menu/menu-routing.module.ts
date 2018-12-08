import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent } from './menu.component';
import { AuthGuard } from '../auth-guard.service';
import { OrderComponent } from './order/order.component';
import { SodoComponent } from './sodo/sodo.component';
import { HoadonComponent } from './hoadon/hoadon.component';
import { CheckorderComponent } from './checkorder/checkorder.component';
import { BepComponent } from './bep/bep.component';
import { AccountComponent } from './account/account.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: '',
        redirectTo: 'sodo',
        pathMatch: 'full',

      },
      {
        path: "order/:idsession",
        canActivate: [AuthGuard],

        component: OrderComponent
      },
      {
        path: "sodo",
        canActivate: [AuthGuard],

        component: SodoComponent
      },
      {
        path: "hoadon",
        canActivate: [AuthGuard],

        component: HoadonComponent
      },
      {
        path: "bep",
        canActivate: [AuthGuard],

        component: BepComponent
      },
      {
        path: "checkorder",
        canActivate: [AuthGuard],
        component: CheckorderComponent
      },
      {
        path: "account",
        canActivate: [AuthGuard],
        component: AccountComponent
      },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class MenuRoutingModule {

}
function newFunction(): string {
  return "hoadon";
}

