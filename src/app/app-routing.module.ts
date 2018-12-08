import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent }      from './login/login.component';
import { MenuRoutingModule } from './menu/menu-routing.module';
import { AdminRoutingModule }      from './admin/admin-routing.module';


const routes: Routes = [
  {
    path: "login",    
    component: LoginComponent,
  }  
];

@NgModule({
  imports: [ RouterModule.forRoot(routes),
    MenuRoutingModule,
    AdminRoutingModule
   ],
  exports: [ RouterModule ]
})


export class AppRoutingModule { 
  
 }
