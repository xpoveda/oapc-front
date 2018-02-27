

import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { HttpClientModule }       from '@angular/common/http';

import { CollapseModule, BsDropdownModule } from 'ngx-bootstrap';

import { AppComponent }           from './app.component';
import { AppRoutingModule }       from './app-routing.module';

import { HomeComponent }          from './components/home/home.component';
import { HeaderComponent }        from './components/header/header.component';
import { FooterComponent }        from './components/footer/footer.component';
import { PageNotFoundComponent }  from './components/page-not-found/page-not-found.component';
import { LoginComponent}          from './components/login/login.component';
import { LogoutComponent }        from './components/logout/logout.component';
import { NotesComponent }         from './components/notes/notes.component';

import { ApiUrlConfigService }    from './services/api-url-config.service';
import { AuthorizationService }   from './services/authorization.service';
import { UserService }            from './services/user.service';
import { NotesService }           from './services/notes.service';
import { TrazaService }           from './services/traza.service';


@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    NotesComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CollapseModule.forRoot(), 
    BsDropdownModule.forRoot()
  ],

  providers: [
    TrazaService,
    ApiUrlConfigService, 
    AuthorizationService, 
    UserService, 
    NotesService,
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }