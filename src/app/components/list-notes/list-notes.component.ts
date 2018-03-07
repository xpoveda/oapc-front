
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Ipagination } from './../../interfaces/ipagination';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  @Input() items;

  @Output() evento_list_put:    EventEmitter<any> = new EventEmitter();
  @Output() evento_list_delete: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log("LIST-COMPONENT");
  }

  actionPut($event)
  {
    console.log($event);
    this.evento_list_put.emit($event);
  }

  actionDelete($event)
  {
    console.log($event);
    this.evento_list_delete.emit($event);
  }
}
