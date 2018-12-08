import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from './menu/menu.service';
import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule} from 'angular-webstorage-service';
import { AuthGuard } from './auth-guard.service';
import { MenuModule } from './menu/menu.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { AdminComponent } from './admin/admin.component';
import { AdminService } from './admin/admin.service';
import { AdminModule } from './admin/admin.module';
import { NotificationService } from './notification/notification.service';
import {NgxPaginationModule} from 'ngx-pagination';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent,
    AdminComponent,
  ],
  imports: [
    BrowserModule,
    ToastrModule.forRoot(),
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    StorageServiceModule,
    MenuModule,
    PerfectScrollbarModule,
    AdminModule,
    NgxPaginationModule,
  ],
  providers: [
    MenuService,
    LoginService,
    AdminService,
    NotificationService,
    AuthGuard,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
