
import { Component, OnInit }        from '@angular/core';
import { BsModalRef }               from "ngx-bootstrap";

@Component({
  selector: 'modal-content',
  templateUrl: './modal-note.component.html',
  styleUrls: ['./modal-note.component.css']
})

export class ModalNoteComponent implements  OnInit  {

  title        : string;
  closeBtnName : string;
  list         : any[] = [];
 
  constructor(public bsModalRef: BsModalRef) 
  {}
 
  ngOnInit() {
    this.list.push('FALTA IMPLEMENTAR');
  }
}
