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

  misnotes: NotesResponse[];

  page:     number;
  per_page: number;

  constructor( private AuthorizationService: AuthorizationService, 
               private NotesService        : NotesService, 
               private TrazaService        : TrazaService,
               private modalService        : BsModalService ) 
  { }

  ngOnInit() {
    this.page     = 1;
    this.per_page = 3;
  }

  onclick2($event)
  {
    console.log("CAPTURA CLICK onclick2 EN CONTROLADOR");
    console.log($event);
  }

  onclick3($event)
  {
    console.log("CAPTURA CLICK onclick3 EN CONTROLADOR");
    console.log($event);
  }

  onclick1($event)
  {
    console.log("CAPTURA CLICK onclick1 EN CONTROLADOR");
    console.log($event);
    this.getNotes();
  }

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

}
