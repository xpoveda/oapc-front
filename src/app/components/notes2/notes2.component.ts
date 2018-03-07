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
    this.pagination.page_items  = 1;    
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


  createButtonList()
  {
    //Crear lista con paginaciones posibles desde 1 hasta pagemax.
    //Crear listafirst con primeros n1 elementos como maximo.
    //Crear listalast con ultimos n2 elementos como maximo.
    //Crear listamiddle situandonos en el elemento central y haciendo n3/2 anteriores y n3/2 siguientes. Si n3 es par coger n3/2 - 1.
    //Concatenar listas. Ordenar y eliminar duplicados. Tenemos lista1
    //Recorrer lista1 y si elemento siguiente tiene diferencia mayor que uno poner .. antes de pintarlo en otra lista2.

    //this.pagination.page_max = this.pagination.page_list.lastIndexOf(this.pagination.page_list.length) + 1;

    let list_all        : number[] = [];
    let list_out        : number[] = [];
    let list_first      : number[] = [];
    let list_middle     : number[] = [];
    let list_last       : number[] = [];
    let list_dist       : number[] = [];

    let max_first_group        : number   = 4;
    let max_middle_group_first : number   = 1;
    let max_middle_group_last  : number   = 1;
    let max_last_group         : number   = 2;

    let parte_resto     : number;
    let parte_entera    : number;

    let page_max        : number;
    let page_mid        : number;

    parte_resto  = this.pagination.total_items % this.pagination.page_items;
    parte_entera = (this.pagination.total_items - parte_resto ) / this.pagination.page_items;    

    if (parte_resto == 0)
      page_max = parte_entera;
    else
      page_max = parte_entera + 1;

    parte_resto  = page_max % 2;
    parte_entera = (page_max - parte_resto) / 2;

    if (parte_resto == 0)
      page_mid = parte_entera;
    else
      page_mid = parte_entera + 1;

    console.log(this.pagination.total_items);
    console.log(this.pagination.page_items);
    console.log("page_max: " + page_max);
    console.log("page_mid: " + page_mid);

    for (let i=1; i<=page_max; i++)
        list_all.push(i);

    console.log("list_all:" + list_all);        
            
    for (let i=1; i<=page_max; i++)
      if ( i <= max_first_group)
        list_first.push(i);
      
    console.log("list_first:" + list_first);

    for (let i=1; i<=page_max; i++)
      if ( i <= max_last_group)
        list_last.push(page_max - i + 1);
      
    console.log("list_last:" + list_last);


    for (let i=page_mid; i>=page_mid - max_middle_group_first; i--)
      if ( i >= 1)
        list_middle.push(i);

    for (let i=page_mid; i<=page_mid + max_middle_group_last; i++)
      if ( i <= page_max)
        list_middle.push(i);

    console.log("list_middle:" + list_middle; 
    
    list_out = list_out.concat(list_first);
    list_out = list_out.concat(list_middle);
    list_out = list_out.concat(list_last);
    console.log("list_out:" + list_out); 
    list_out = list_out.sort((n1,n2) => n1 - n2);
    console.log("list_ord:" + list_out); 

  
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

                                  this.createButtonList();
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }
  
}
