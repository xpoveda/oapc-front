import { Component, OnInit }       from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'app';

  constructor(){
  }
  ngOnInit(): void {

  }
}

// https://github.com/christiannwamba/scotch-ng2-http

// ng g component components/hola
// ng g service services/hola
// ng g class model/hola

//https://stackoverflow.com/questions/39091735/port-4200-is-already-in-use-when-running-the-ng-serve-command
