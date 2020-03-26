import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Egypt2030Component } from './egypt2030.component';

describe('Egypt2030Component', () => {
  let component: Egypt2030Component;
  let fixture: ComponentFixture<Egypt2030Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Egypt2030Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Egypt2030Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
