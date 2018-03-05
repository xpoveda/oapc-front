import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-form-notes',
  templateUrl: './form-notes.component.html',
  styleUrls: ['./form-notes.component.css']
})
export class FormNotesComponent implements OnInit {

  @Input()  titulo_form:  string;
  @Output() evento_form1: EventEmitter<any> = new EventEmitter();

  fcampoA: String;
  fcampoB: String;
  filtros: any;

  constructor() { }

  ngOnInit() {
  }

  onclick($event)
  {
    console.log("CAPTURADO CLICK EN FORMULARIO");
    console.log("EMITIMOS EVENTO eventoNotesClicked");
    
    this.filtros = { "campoA": this.fcampoA, "campoB" : this.fcampoB };
    this.evento_form1.emit(JSON.stringify(this.filtros));
  }

}
