import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBusinessPagesComponent } from './manage-business-pages.component';

describe('ManageBusinessPagesComponent', () => {
  let component: ManageBusinessPagesComponent;
  let fixture: ComponentFixture<ManageBusinessPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageBusinessPagesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageBusinessPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
