import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';

import { CommonModule} from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MenuService } from './menu/menu.service';
import { LoginService } from './login/login.service';
import { AppRoutingModule } from './app-routing.module';
import { StorageServiceModule} from 'angular-webstorage-service';
import { AuthGuard } from './auth-guard.service';
import { MenuModule } from './menu/menu.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    AngularFontAwesomeModule,
    AppRoutingModule,
    StorageServiceModule,
    MenuModule,
  ],
  providers: [
    MenuService,
    LoginService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
