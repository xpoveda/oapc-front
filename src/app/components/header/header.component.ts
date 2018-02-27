import { Observable } from 'rxjs/Rx';

import { Component, OnInit } from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService }         from '../../services/traza.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private islogged;

  constructor(private AuthorizationService : AuthorizationService,
              private TrazaService         : TrazaService) 
  { }

  ngOnInit() 
  {
    this.TrazaService.log("HEADER", "ngOnInit", "");

    Observable.interval(1000).subscribe ( x => {
      this.islogged = this.AuthorizationService.is_logged();
    });

  }

}
