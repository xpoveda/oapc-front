import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Dummie1Component } from './dummie1.component';

describe('Dummie1Component', () => {
  let component: Dummie1Component;
  let fixture: ComponentFixture<Dummie1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Dummie1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Dummie1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
