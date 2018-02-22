import { UserService }          from './services/user.service';
import { AuthorizationService } from './services/authorization.service';

import { BrowserModule }    from '@angular/platform-browser';
import { NgModule }         from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent }     from './app.component';

import { LoginComponent}    from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [AuthorizationService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }