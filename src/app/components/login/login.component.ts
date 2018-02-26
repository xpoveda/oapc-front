
import { UserService }           from './../../services/user.service';
import { AuthorizationService }  from './../../services/authorization.service';

import { Component, OnInit }     from '@angular/core';

import { TokenResponse }         from './../../interfaces/token-response';
import { UsersResponse }         from './../../interfaces/users-response';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  mitoken      : TokenResponse;
  miuserall    : UsersResponse[];

  miwhoami     : any;
  mirespuesta  : any;

  constructor( private AuthorizationService: AuthorizationService, 
               private UserService: UserService 
             ) 
  { }

  ngOnInit() 
  { }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////

  login(user:string, password:string)
  {
    this.AuthorizationService.login( user, password)
      .subscribe( respuesta => { this.mitoken = respuesta;
                                 console.log("LOGIN OK " + user);
                                 localStorage.setItem("TOKEN", this.mitoken.access_token);
                               },
                  error =>     { console.log("LOGIN NOK" + user);
                                 localStorage.removeItem("TOKEN");
                                 console.log(error); }
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  whoami()
  {
    if (this.AuthorizationService.is_logged())
      this.AuthorizationService.whoami()
        .subscribe ( respuesta => { this.miwhoami = respuesta;
                                    console.log(this.miwhoami); 
                                  },
                    error =>      { console.log(error); }      
        );
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  change_password(oldpass:string, newpass:string)
  {
    if (this.AuthorizationService.is_logged())
      this.AuthorizationService.change_password(oldpass, newpass)
      .subscribe( respuesta => { this.mirespuesta = respuesta;
                                 console.log(this.mirespuesta);
                              },
                  error =>     {  console.log(error); }
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  refresh()
  {
    if (this.AuthorizationService.is_logged())
      this.AuthorizationService.refresh()
      .subscribe( respuesta => { this.mitoken = respuesta;
                                localStorage.setItem("TOKEN", this.mitoken.access_token);
                              },
                  error =>     {  console.log(error); }
      );
  }

  ////////////////////////////////////////////////////////////////////////////////////////

  logout()
  {
    if (this.AuthorizationService.is_logged())
      this.AuthorizationService.logout();
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  userall()
  {
    if (this.AuthorizationService.is_logged())
      this.UserService.userall()
      .subscribe ( respuesta => { this.miuserall = respuesta;
                                  console.log(this.miuserall); 
                                },
                  error =>      { console.log(error); }      
      );
  }

}