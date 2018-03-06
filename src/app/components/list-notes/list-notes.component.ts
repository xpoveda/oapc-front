import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  @Input() elementos;

  @Input() page:                    number;
  @Input() per_page:                number;
  @Input() total_reg:               number;
  @Input() page_list:               number;

  @Output() evento_list_put:        EventEmitter<any> = new EventEmitter();
  @Output() evento_list_delete:     EventEmitter<any> = new EventEmitter();
  @Output() evento_list_pagination: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    console.log("LIST-COMPONENT");
    console.log(this.page);
    console.log(this.per_page);
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

  actionPagination($event)
  {
    this.evento_list_pagination.emit($event);
  }
}
