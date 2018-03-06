import { Component, OnInit }    from '@angular/core';

import { AuthorizationService } from '../../services/authorization.service';
import { NotesService }         from '../../services/notes.service';
import { TrazaService }         from '../../services/traza.service';

import { BsModalService }       from 'ngx-bootstrap';

import { NotesResponse }        from '../../interfaces/notes-response';

@Component({
  selector: 'app-notes2',
  templateUrl: './notes2.component.html',
  styleUrls: ['./notes2.component.css']
})
export class Notes2Component implements OnInit {

  misnotes:  NotesResponse[];
  
  page:      number;
  per_page:  number;
  total_reg: number;

  page_list: number[];

  constructor( private AuthorizationService: AuthorizationService, 
               private NotesService        : NotesService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService ) 
  { }

  ngOnInit() {
    this.page      = 1;
    this.per_page  = 2;
    this.total_reg = 0;
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
    this.page = $event;
    this.getNotesPage();  
  }


  /////////////////////////////////////////////////////////////////////////////////////////////

  getNotes()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotes()
      .subscribe ( respuesta => { this.misnotes = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTES OK", this.misnotes);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTES KO", error); } 
      );
  }

  getNotesPage()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotesPage(this.page, this.per_page)
      .subscribe ( respuesta => { this.misnotes = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTESPAGE OK", this.misnotes);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESPAGE KO", error); } 
      );
  }

  getNotesCount()
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNotesCount()
      .subscribe ( respuesta => { this.total_reg = respuesta;

                                  this.page_list = [];                                  
                                  for (let i=0; i<this.total_reg/this.per_page; i++)
                                      this.page_list.push(i+1);

                                  this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.misnotes);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }
  
}
