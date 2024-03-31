// pricing-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';
import { PricingService } from '../../services/pricing.service'; // Import the service
import { Pricing } from '../../model/pricing.model';

@Component({
  selector: 'app-pricing-page',
  templateUrl: './pricing-page.component.html',
  styleUrls: ['./pricing-page.component.css'],
})
export class PricingPageComponent implements OnInit {
  public pricingForm!: FormGroup;
  serviceId: number | null = null; 
  serviceDetails: any; // Variable to store service details
  pricings: Pricing[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private pricingService: PricingService // Inject the service
    
  ) {}

  // ngOnInit(): void {
  //   this.getAllPricings();

  //   // this.route.params.subscribe((params) => {
  //   //   this.serviceId = params['serviceId'];
  //   //   if (this.serviceId) {
  //   //     this.getServiceDetails(this.serviceId);
  //   //   }
  //   // });
  // }

  ngOnInit(): void {
    // Extract service ID from route parameters
    this.route.paramMap.subscribe(params => {
      const serviceIdString = params.get('serviceId');
      if (serviceIdString) {
        this.serviceId = parseInt(serviceIdString, 10); // Convert string to number
        // Fetch service profile based on service ID
        this.getServiceDetails();
      } else {
        // Handle the case when 'serviceId' is null
        console.error('Service ID is null');
      }
    });
  }

  getServiceDetails(): void {
    if (this.serviceId) {
      this.pricingService.getServiceDetails(this.serviceId).subscribe(
        (data: Pricing) => {
          this.serviceDetails = data;
          console.log('Service Details:', this.serviceDetails);
        },
        (error: any) => {
          console.error('Error fetching service profile:', error);
        }
      );
    }
  }

  // getAllPricings(): void {
  //   this.pricingService.getAllPricings().subscribe(
  //     (data: Pricing[]) => {
  //       this.pricings = data;
  //       console.log('Service Profiles:', this.pricings);
  //     },
  //     (error: any) => {
  //       console.error('Error fetching service profiles:', error);
  //     }
  //   );
  // }

  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }

  // routeToProfile(serviceId: number) {
  //   this.router.navigate(['/pricing', serviceId]);
  // }

  logout(): void {
    this.authenticationService.logout();
  }
}
