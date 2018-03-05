import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-list-notes',
  templateUrl: './list-notes.component.html',
  styleUrls: ['./list-notes.component.css']
})
export class ListNotesComponent implements OnInit {

  @Input() elementos;

  @Input() page:          number;
  @Input() per_page:      number;

  @Output() evento_list1: EventEmitter<any> = new EventEmitter();
  @Output() evento_list2: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {

    console.log("LIST-NOTES-COMPONENT");
    console.log(this.page);
    console.log(this.per_page);
  }

  actionPutNote($event)
  {
    console.log($event);
    this.evento_list1.emit($event);
  }

  actionDeleteNote($event)
  {
    console.log($event);
    this.evento_list2.emit($event);
  }
}
