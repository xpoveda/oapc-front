
import { Component, OnInit }     from '@angular/core';
import { Router }                from '@angular/router';

import { AuthorizationService }  from '../../services/authorization.service';
import { TrazaService }          from '../../services/traza.service';


@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})

export class LogoutComponent implements OnInit {

  constructor( private router               : Router,
               private AuthorizationService : AuthorizationService,
               private TrazaService         : TrazaService ) 
  { }

  ngOnInit() 
  { 
    this.TrazaService.log("LOGOUT", "ngOnInit", "");
    this.logout();
  }

  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////


  logout()
  {
    if (this.AuthorizationService.is_logged())
    {
      this.AuthorizationService.logout();
      this.router.navigateByUrl("/login");
    }
  }

  ///////////////////////////////////////////////////////////////////////////////////////

}
