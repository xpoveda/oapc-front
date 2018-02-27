

import { Component, OnInit }          from '@angular/core';
import { Router }                     from '@angular/router';

import { Observable }                 from 'rxjs/Rx';

import { AuthorizationService }       from '../../services/authorization.service';
import { UserService }                from '../../services/user.service';
import { TrazaService }               from '../../services/traza.service';

import { TokenResponse }              from '../../interfaces/token-response';
import { MyUser }                     from '../../interfaces/my-user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

export class HomeComponent implements OnInit {

  private islogged;

  mitoken      : TokenResponse;
  mirespuesta  : any;
  miusuario    : MyUser;

  user_name    : string;


  constructor( private router               : Router, 
               private AuthorizationService : AuthorizationService, 
               private UserService          : UserService,
               private TrazaService         : TrazaService ) 
  { }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  ngOnInit() 
  {
    this.TrazaService.log("HOME", "ngOnInit", "");

    this.whoami();

    Observable.interval(1000).subscribe ( x => {
      this.islogged  = this.AuthorizationService.is_logged();
      this.user_name = this.AuthorizationService.user_name();
    });

  }

  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////

  userall()
  {
    if (this.AuthorizationService.is_logged())
      this.UserService.userall()
      .subscribe ( respuesta => { this.mirespuesta = respuesta;
                                  this.TrazaService.dato("HOME", "API USERALL OK", this.mirespuesta);
                                },
                  error =>      { this.TrazaService.error("HOME", "API USERALL KO", error); }      
      );
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  whoami()
  {
    if (this.AuthorizationService.is_logged())
      this.AuthorizationService.whoami()
        .subscribe ( respuesta => { this.mirespuesta = respuesta;
                                    this.TrazaService.log("HOME", "API WHOAMI OK", "");

                                    this.miusuario           = JSON.parse(localStorage.getItem("USER"));

                                    this.miusuario.firstname = this.mirespuesta.firstName;
                                    this.miusuario.lastname  = this.mirespuesta.lastName;

                                    localStorage.removeItem("USER");
                                    localStorage.setItem("USER", JSON.stringify(this.miusuario));
                                  },
                    error =>      { this.TrazaService.error("HOME", "API WHOAMI KO", error); }      
        );
  }

  ///////////////////////////////////////////////////////////////////////////////////////

  refresh()
  {
    if (this.AuthorizationService.is_logged())
      this.AuthorizationService.refresh()
      .subscribe( respuesta => { this.mitoken = respuesta;
                                 this.TrazaService.log("HOME", "API REFRESH OK", "");

                                 this.miusuario       = JSON.parse(localStorage.getItem("USER"));
                                 this.miusuario.token = this.mitoken.access_token;

                                 localStorage.removeItem("USER");
                                 localStorage.setItem("USER", JSON.stringify(this.miusuario));
                               },
                  error =>     { this.TrazaService.error("HOME", "API REFRESH KO", error); } 
      );
  }

  ///////////////////////////////////////////////////////////////////////////////////////

    change_password(oldpass:string, newpass:string)
    {
      if (this.AuthorizationService.is_logged())
        this.AuthorizationService.change_password(oldpass, newpass)
        .subscribe( respuesta => { this.mirespuesta = respuesta;
                                   this.TrazaService.log("HOME", "API CHANGE-PASSWORD OK", "");
                                 },
                    error =>     { this.TrazaService.error("HOME", "API CHANGE-PASSWORD KO", error); } 
        );
    }

  ///////////////////////////////////////////////////////////////////////////////////////

}
