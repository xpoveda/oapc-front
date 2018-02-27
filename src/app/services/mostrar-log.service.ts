
import { Injectable } from '@angular/core';

@Injectable()
export class MostrarLogService {

  constructor() { }

  traza(dato:any)
  {
      console.log(dato);
  }

  error(dato:any)
  {
      console.log(dato);
  }

}
