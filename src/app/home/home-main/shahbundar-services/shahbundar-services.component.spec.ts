import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShahbundarServicesComponent } from './shahbundar-services.component';

describe('ShahbundarServicesComponent', () => {
  let component: ShahbundarServicesComponent;
  let fixture: ComponentFixture<ShahbundarServicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShahbundarServicesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShahbundarServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
