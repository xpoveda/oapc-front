
import { BrowserModule }          from '@angular/platform-browser';
import { NgModule }               from '@angular/core';
import { HttpClientModule }       from '@angular/common/http';

import { FormsModule }            from '@angular/forms';
import { ReactiveFormsModule }    from '@angular/forms';

import { CollapseModule }         from 'ngx-bootstrap';
import { BsDropdownModule }       from 'ngx-bootstrap';
import { ModalModule  }           from 'ngx-bootstrap';

import { AppComponent }           from './app.component';
import { AppRoutingModule }       from './app-routing.module';

import { HomeComponent }          from './components/home/home.component';
import { HeaderComponent }        from './components/header/header.component';
import { FooterComponent }        from './components/footer/footer.component';
import { PageNotFoundComponent }  from './components/page-not-found/page-not-found.component';
import { LoginComponent}          from './components/login/login.component';
import { LogoutComponent }        from './components/logout/logout.component';
import { NotesComponent }         from './components/notes/notes.component';

import { ModalNoteComponent }     from './components/modal-note/modal-note.component';

import { ApiUrlConfigService }    from './services/api-url-config.service';
import { AuthorizationService }   from './services/authorization.service';
import { UserService }            from './services/user.service';
import { NotesService }           from './services/notes.service';
import { TrazaService }           from './services/traza.service';

import { Notes2Component }        from './components/notes2/notes2.component';
import { FormNotesComponent }     from './components/form-notes/form-notes.component';
import { ListNotesComponent }     from './components/list-notes/list-notes.component';
import { ButtonListNotesComponent } from './components/button-list-notes/button-list-notes.component';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@NgModule({
  declarations: [ 
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    LoginComponent,
    LogoutComponent,
    NotesComponent,
    ModalNoteComponent,
    Notes2Component,
    FormNotesComponent,
    ListNotesComponent,
    ButtonListNotesComponent
  ],

  entryComponents: [ModalNoteComponent],

  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CollapseModule.forRoot(), 
    BsDropdownModule.forRoot(),
    ModalModule.forRoot()
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