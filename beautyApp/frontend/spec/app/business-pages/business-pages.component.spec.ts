import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BusinessPagesComponent } from '../../../src/app/business-pages/business-pages.component';
import { ServiceProfileService } from '../../../src/app/services/serviceProfile.service';
import { PricingService } from '../../../src/app/services/pricing.service';
import { of } from 'rxjs';

describe('BusinessPagesComponent', () => {
    let component: BusinessPagesComponent;
    let fixture: ComponentFixture<BusinessPagesComponent>;
    let serviceProfileService: jasmine.SpyObj<ServiceProfileService>;
    let pricingService: jasmine.SpyObj<PricingService>;
  
    beforeEach(async () => {
      const serviceProfileServiceSpy = jasmine.createSpyObj('ServiceProfileService', ['getServiceDetails', 'getPortfolioByServiceId', 'getImagesBlob', 'saveServiceDetails', 'saveServiceImages', 'updateServiceDetails']);
      const pricingServiceSpy = jasmine.createSpyObj('PricingService', ['deletePricing']);
  
      await TestBed.configureTestingModule({
        declarations: [BusinessPagesComponent],
        imports: [FormsModule, ReactiveFormsModule, HttpClientModule],
        providers: [
          { provide: ServiceProfileService, useValue: serviceProfileServiceSpy },
          { provide: PricingService, useValue: pricingServiceSpy }
        ]
      })
      .compileComponents();
      serviceProfileService = TestBed.inject(ServiceProfileService) as jasmine.SpyObj<ServiceProfileService>;
      pricingService = TestBed.inject(PricingService) as jasmine.SpyObj<PricingService>;
    });
  
    beforeEach(() => {
      fixture = TestBed.createComponent(BusinessPagesComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    });
  
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  
    it('should delete pricing', () => {
      const id = 1;
      pricingService.deletePricing.and.returnValue(of(null));
  
      component.deletePricing(id);
  
      expect(pricingService.deletePricing).toHaveBeenCalledWith(id);
    });
  
    // Add more tests for other component methods and interactions with services
  });