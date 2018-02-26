import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable }              from 'rxjs/Rx';

import { Router }                  from '@angular/router'; 

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

  //////////////////////////////////////////////////////////////////////////////////////

import { ApiUrlConfigService }     from './api-url-config.service';

import { TokenResponse }           from '../interfaces/token-response';

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

@Injectable()
export class AuthorizationService {

  constructor(private http                : HttpClient, 
              private router              : Router,
              private ApiUrlConfigService : ApiUrlConfigService
             ) 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  login(user: string, pass: string): Observable<TokenResponse> {

    return this.http.post( this.ApiUrlConfigService._loginURL,
                           { "username": user, "password": pass },
                           { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
            .map(respuesta => respuesta)
            .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

  whoami(): Observable<any> {

    return this.http.get( this.ApiUrlConfigService._whoamiURL, 
                          this.header_token() )
            .map(respuesta => respuesta)
            .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

  refresh(): Observable<TokenResponse> {

    return this.http.post( this.ApiUrlConfigService._refreshURL,
                           { },
                           this.header_token() )
            .map(respuesta => respuesta)
            .catch((error: any) => Observable.throw(error));
  }

  //////////////////////////////////////////////////////////////////////////////////////

  change_password(oldpass: string, newpass: string): Observable<any> {

    return this.http.post(  this.ApiUrlConfigService._change_passwordURL,
                            { "oldPassword": oldpass, "newPassword" : newpass },
                            this.header_token() )
            .map(respuesta => respuesta)
            .catch((error: any) => Observable.throw(error));
  } 
  
    //////////////////////////////////////////////////////////////////////////////////////
  
    is_logged()
    {
      if (localStorage.getItem('TOKEN'))
      {
        console.log("USUARIO CONECTADO");
        return true;
      }
      else
      {
        console.log("USUARIO NO CONECTADO");
        return false;
      }
    }
  
    //////////////////////////////////////////////////////////////////////////////////////
  
    logout()
    {
      console.log("USUARIO DESCONECTADO");
      localStorage.removeItem('TOKEN');
      this.router.navigateByUrl("/login");

      // Esto se necesita para refrescar totalmente la pagina cuando venimos de la misma
      window.location.reload();
    }

    
    //////////////////////////////////////////////////////////////////////////////////////

    header_token()
    { 
      if (localStorage.getItem('TOKEN'))
        return { headers: new HttpHeaders ( { 'Content-Type' : 'application/json' , 
                                              'Authorization': 'Bearer ' + localStorage.getItem('TOKEN') 
                                            }
                                          ) 
                }; 
      else  
        return null;
    }
}




