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
    this.pagination.page_items  = 3;    
    this.pagination.total_items = 0;
    this.pagination.page_list   = [];
  }

  /////////////////////////////////////////////////////////////////////////////////////////////

  onClickBuscarForm($event)
  {
    console.log("controller: onClickBuscarForm " + $event);

    this.pagination.page_actual = 1;

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
    let list_out:               number[] = [];
    let list_first:             number[] = [];
    let list_middle:            number[] = [];
    let list_last:              number[] = [];
    let list_final:             number[] = [];
    let list_finals:            string[] = [];

    let max_first_group:         number = 2;
    let max_middle_group_first:  number = 1;
    let max_middle_group_last:   number = 1;
    let max_last_group:          number = 2;

    let parte_resto:             number;
    let parte_entera:            number;

    let page_max:                number;
    let page_mid:                number;

    let compara1:                number;
    let compara2:                number;

    parte_resto  = this.pagination.total_items % this.pagination.page_items;
    parte_entera = (this.pagination.total_items - parte_resto ) / this.pagination.page_items;    

    if (parte_resto == 0)
      page_max = parte_entera;
    else
      page_max = parte_entera + 1;

    //parte_resto  = page_max % 2;
    //parte_entera = (page_max - parte_resto) / 2;
    //if (parte_resto == 0)
    //  page_mid = parte_entera;
    //else
    //  page_mid = parte_entera + 1;

    if ((this.pagination.page_actual > max_first_group) &&
        (this.pagination.page_actual < page_max - max_first_group + 1))
      page_mid = this.pagination.page_actual;      

  ///////
  console.log("total_items: " + this.pagination.total_items);
  console.log("page_items : " + this.pagination.page_items);
  console.log("page_max   : " + page_max);
  console.log("page_mid   : " + page_mid);

  ///////
    for (let i=1; i<=page_max; i++)
      if ( i <= max_first_group)
        list_first.push(i);
      
  //console.log("list_first:" + list_first);

  ///////    
    for (let i=1; i<=page_max; i++)
      if ( i <= max_last_group)
        list_last.push(page_max - i + 1);
      
  //console.log("list_last:" + list_last);

  ///////
    for (let i=page_mid; i>=page_mid - max_middle_group_first; i--)
      if ( i >= 1)
        list_middle.push(i);

    for (let i=page_mid; i<=page_mid + max_middle_group_last; i++)
      if ( i <= page_max)
        list_middle.push(i);

  //console.log("list_middle:" + list_middle); 
    
    ///////
    list_out = list_out.concat(list_first);
    list_out = list_out.concat(list_middle);
    list_out = list_out.concat(list_last);    
    console.log("list_out:" + list_out); 
    
    ///////
    list_out = list_out.sort((n1,n2) => n1 - n2);
    console.log("list_ord:" + list_out); 

    ///////
    for (let i=0; i<list_out.length;i++)
      if (list_final.indexOf(list_out[i]) < 0)
        list_final.push(list_out[i]);

  //console.log("list_final:" + list_final); 

  for (let i=0; i<list_final.length;i++)
  {
    list_finals.push(list_final[i].toString());

    if (i < list_final.length - 1)    
    {
      compara1 = list_final[i] + 1;
      compara2 = list_final[ i + 1];

      if (compara1 != compara2)
        list_finals.push("..");        
    }
  }

    this.pagination.page_list = list_finals;
    this.pagination.page_max  = page_max; 
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
                                  this.createButtonList();
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
                                  this.TrazaService.dato("NOTES", "API GETNOTESCOUNT OK", this.items);                                                                            
                                },
                  error =>      { this.TrazaService.error("NOTES", "API GETNOTESCOUNT KO", error); } 
      );
  }
  
}
