
import { Component, OnInit }    from '@angular/core';

import { Observable }           from 'rxjs/Rx';

import { AuthorizationService } from '../../services/authorization.service';
import { TrazaService }         from './../../services/traza.service';

import { NotesService }         from '../../services/notes.service';
import { NotesResponse }        from '../../interfaces/notes-response';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  private islogged;

  misnotes: NotesResponse[];
  minote  : NotesResponse;

  constructor( private AuthorizationService: AuthorizationService, 
               private NotesService        : NotesService, 
               private TrazaService        : TrazaService ) 
  { }

  ngOnInit() 
  {

    this.TrazaService.log("NOTES", "ngOnInit", "");

    Observable.interval(100).subscribe ( x => {
      this.islogged  = this.AuthorizationService.is_logged();
    });

    //this.putNote(28,"28 bis","28 bis bis");
    //this.deleteNote(27);
    this.getNotes();
    //this.getNote(100);
    //this.postNote("hola", "que tal");
    //this.putNote(1,"modificada primera nota","otro campo");
  }
  
  //////////////////////////////////////////////////////////////////////////////////////

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

  //////////////////////////////////////////////////////////////////////////////////////

  getNote(id: number)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.getNote(id)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API GETNOTE OK", this.misnotes);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTE KO", error); }   
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  postNote(title: string, content: string)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.postNote(title, content)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API POSTNOTE OK", this.minote);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API POSTNOTE KO", error); }    
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  putNote(id: number, title: string, content: string)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.putNote(id, title, content)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API PUTNOTE OK", this.minote);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API PUTNOTE KO", error); }      
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

  deleteNote(id: number)
  {
    if (this.AuthorizationService.is_logged())
      this.NotesService.deleteNote(id)
      .subscribe ( respuesta => { this.minote = respuesta;
                                  this.TrazaService.dato("NOTES", "API DELETE OK", this.minote);
                                },
                  error =>      { this.TrazaService.error("NOTES", "API DELETE KO", error); }     
      );
  }

  //////////////////////////////////////////////////////////////////////////////////////

}
