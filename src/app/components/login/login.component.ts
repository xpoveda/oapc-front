
import { UserService }           from './../../services/user.service';
import { AuthorizationService }  from './../../services/authorization.service';

import { Component, OnInit }     from '@angular/core';

import { TokenResponse }         from './../../model/token-response';
import { UsersResponse }         from './../../interfaces/root-authorities';

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
             ) { }

  ngOnInit() {

    
    this.AuthorizationService.login( "admin", "123" )
      .subscribe( respuesta => { this.mitoken = respuesta;
                                 localStorage.setItem("tk", this.mitoken.access_token);
                               },
                  error =>     {  console.log(error); }
      );
    

    // Hay que recordar que los observables devuelven datos que hasta que no esten mapeados
    // pueden devolver error en la consola, no en la vista que siempre se devolveran correctamente

    this.AuthorizationService.whoami()
      .subscribe ( respuesta => { this.miwhoami = respuesta;
                                  console.log(this.miwhoami); 
                                },
                  error =>      { console.log(error); }      
      );

      this.UserService.userall()
      .subscribe ( respuesta => { this.miuserall = respuesta;
                                  console.log(this.miuserall); 
                                },
                  error =>      { console.log(error); }      
      );

      /*
      this.AuthorizationService.refresh()
      .subscribe( respuesta => { this.mitoken = respuesta;
                                 localStorage.setItem("tk", this.mitoken.access_token);
                               },
                  error =>     {  console.log(error); }
      );
      */

      /*
      this.AuthorizationService.change_password("456", "123")
      .subscribe( respuesta => { this.mirespuesta = respuesta;
                                 console.log(this.mirespuesta);
                               },
                  error =>     {  console.log(error); }
      );
      */
  }
}