import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable}                from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { TokenResponse } from '../model/token-response';

@Injectable()
export class AuthorizationService {

  private _header_token;

  private _loginURL           = '/api/login';
  private _whoamiURL          = '/api/whoami';
  private _refreshURL         = '/api/refresh';
  private _change_passwordURL = '/api/change-password';

  constructor(private http: HttpClient) { }

  header_token()
  { 
    if (localStorage.getItem('tk'))
    {
      this._header_token    = { headers: new HttpHeaders ( { 'Content-Type' : 'application/json' , 
                                                             'Authorization': 'Bearer ' + localStorage.getItem('tk') 
                                                        }
                                                     ) 
                              }; 
    }
  }

  login(user: string, pass: string): Observable<TokenResponse> {
    return this.http.post(
      this._loginURL,
      { "username": user, "password": pass },
      { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) })
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  whoami(): Observable<any> {
    this.header_token();

    return this.http.get(
      this._whoamiURL, this._header_token )
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  refresh(): Observable<TokenResponse> {
    this.header_token();

    return this.http.post(
      this._refreshURL,
      { },
      this._header_token)
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  }

  change_password(oldpass: string, newpass: string): Observable<any> {
    this.header_token();

    return this.http.post(
      this._change_passwordURL,
      { "oldPassword": oldpass, "newPassword" : newpass },
      this._header_token)
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));
  } 

}




