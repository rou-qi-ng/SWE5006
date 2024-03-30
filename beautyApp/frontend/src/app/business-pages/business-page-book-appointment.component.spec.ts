import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessPageBookAppointmentComponent } from './business-page-book-appointment.component';

describe('BusinessPageBookAppointmentComponent', () => {
  let component: BusinessPageBookAppointmentComponent;
  let fixture: ComponentFixture<BusinessPageBookAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BusinessPageBookAppointmentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BusinessPageBookAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
