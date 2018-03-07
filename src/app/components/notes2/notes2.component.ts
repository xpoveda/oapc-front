import { Component, OnInit }    from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { NotesService }         from '../../services/notes.service';
import { TrazaService }         from '../../services/traza.service';

import { BsModalService }       from 'ngx-bootstrap';

import { NotesResponse }        from '../../interfaces/notes-response';
import { Pagination }           from '../../model/pagination';

@Component({
  selector: 'app-notes2',
  templateUrl: './notes2.component.html',
  styleUrls: ['./notes2.component.css']
})
export class Notes2Component implements OnInit {

  pagination: Pagination;
  items:      NotesResponse[];

  constructor( private AuthorizationService: AuthorizationService, 
               private NotesService        : NotesService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService ) 
  { }

  ngOnInit() {    
    this.pagination = new Pagination;
    
    this.pagination.page_actual = 1;
    this.pagination.page_max    = 0;
    this.pagination.page_items  = 2;    
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  onClickBuscarForm($event)
  {
    console.log("controller: onClickBuscarForm " + $event);
    this.getNotesCount();
    this.getNotesPage();    
  }

  onClickPutList($event)
  {
    console.log("controller: onClickPutList "); 
    console.log($event);
  }

  onClickDeleteList($event)
  {
    console.log("controller: onClickDeleteList ");
    console.log($event);
  }

  onClickPagination($event)
  {
    console.log("controller: onClickPagination " + $event);    
    this.pagination.page_actual = $event;
    this.getNotesPage();  
  }


  /////////////////////////////////////////////////////////////////////////////////////////////

  getNotes()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotes()
      .subscribe ( respuesta => { this.items = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTES OK", this.items);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTES KO", error); } 
      );
  }

  getNotesPage()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotesPage(this.pagination.page_actual, this.pagination.page_items)
      .subscribe ( respuesta => { this.items = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTESPAGE OK", this.items);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESPAGE KO", error); } 
      );
  }

  getNotesCount()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotesCount()
      .subscribe ( respuesta => { this.pagination.total_items = respuesta;

                                  this.pagination.page_list = [];                                  
                                  for (let i=0; i<this.pagination.total_items/this.pagination.page_items; i++)
                                      this.pagination.page_list.push(i + 1);

                                  this.pagination.page_max = this.pagination.page_list.lastIndexOf(this.pagination.page_list.length) + 1;

                                  this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }
  
}
