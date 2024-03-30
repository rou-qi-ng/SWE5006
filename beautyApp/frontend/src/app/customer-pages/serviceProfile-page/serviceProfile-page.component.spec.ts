import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceProfilePageComponent } from './serviceProfile-page.component';

describe('ServiceProfilePageComponent', () => {
  let component: ServiceProfilePageComponent;
  let fixture: ComponentFixture<ServiceProfilePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServiceProfilePageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ServiceProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
