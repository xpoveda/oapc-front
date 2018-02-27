import { Injectable } from '@angular/core';

@Injectable()
export class TrazaService {

  constructor() { }

  log(modulo: string, funcion: string, mensaje: any)
  {
    console.log("LOG" + " " + modulo + " " + funcion + " " + mensaje);
  }

  dato(modulo: string, funcion: string, mensaje: any)
  {
    console.log("DATO" + " " + modulo + " " + funcion);
    console.log(mensaje);
  }

  error(modulo: string, funcion: string, mensaje: any)
  {
    console.log("ERROR" + " " + modulo + " " + funcion);
    console.log(mensaje);
  }

}
