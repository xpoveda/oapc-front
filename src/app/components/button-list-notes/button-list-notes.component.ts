import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Ipagination } from '../../interfaces/ipagination';

@Component({
  selector: 'app-button-list-notes',
  templateUrl: './button-list-notes.component.html',
  styleUrls: ['./button-list-notes.component.css']
})
export class ButtonListNotesComponent implements OnInit {

  @Input() pagination:              Ipagination;
  
  @Output() evento_list_pagination: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    console.log("BUTTON-LIST-COMPONENT***");
    console.log(this.pagination.page_actual);
    console.log(this.pagination.page_items);
  }

  actionPagination($event)
  {
    this.evento_list_pagination.emit($event);
  }
}
