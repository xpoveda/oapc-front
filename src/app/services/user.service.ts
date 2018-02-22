import { Injectable }              from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable}                from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { UsersResponse }              from '../interfaces/root-authorities';

@Injectable()
export class UserService {

  private _header_token;

  private _userallURL = '/api/user/all';

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

  userall(): Observable<UsersResponse[]>
  {
    this.header_token();

    return this.http.get(
      this._userallURL, this._header_token )
      .map(respuesta => respuesta)
      .catch((error: any) => Observable.throw(error));  
  }

}