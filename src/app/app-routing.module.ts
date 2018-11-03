import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MenuComponent }      from './menu/menu.component';
import { LoginComponent }      from './login/login.component';
import { AuthGuard }                from './auth-guard.service';
import { MenuRoutingModule } from './menu/menu-routing.module';
import { AdminComponent }      from './admin/admin.component';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    component: MenuComponent,
  },
  {
    path: "login",    
    component: LoginComponent,
  },
  {
    path: "admin",
    canActivate: [AuthGuard],
    component: AdminComponent,
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes),
    MenuRoutingModule
   ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { 
  
 }
