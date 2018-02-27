import { TestBed, inject } from '@angular/core/testing';

import { MostrarLogService } from './mostrar-log.service';

describe('MostrarLogService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MostrarLogService]
    });
  });

  it('should be created', inject([MostrarLogService], (service: MostrarLogService) => {
    expect(service).toBeTruthy();
  }));
});
