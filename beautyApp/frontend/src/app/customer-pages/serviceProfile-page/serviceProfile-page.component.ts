// serviceProfile-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';
import { ServiceProfileService } from '../../services/serviceProfile.service'; // Import the service
import { ServiceProfile } from '../../model/serviceProfile.model';

@Component({
  selector: 'app-serviceProfile-page',
  templateUrl: './serviceProfile-page.component.html',
  styleUrls: ['./serviceProfile-page.component.css'],
})
export class ServiceProfilePageComponent implements OnInit {
  public serviceProfileForm!: FormGroup;
  serviceId: number | null = null; 
  serviceDetails: any; // Variable to store service details
  serviceProfiles: ServiceProfile[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private serviceProfileService: ServiceProfileService // Inject the service
    
  ) {}

  // ngOnInit(): void {
  //   this.getAllServiceProfiles();

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
      this.serviceProfileService.getServiceDetails(this.serviceId).subscribe(
        (data: ServiceProfile) => {
          this.serviceDetails = data;
          console.log('Service Details:', this.serviceDetails);
        },
        (error: any) => {
          console.error('Error fetching service profile:', error);
        }
      );
    }
  }

  // getAllServiceProfiles(): void {
  //   this.serviceProfileService.getAllServiceProfiles().subscribe(
  //     (data: ServiceProfile[]) => {
  //       this.serviceProfiles = data;
  //       console.log('Service Profiles:', this.serviceProfiles);
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
  //   this.router.navigate(['/serviceProfile', serviceId]);
  // }

  logout(): void {
    this.authenticationService.logout();
  }
}
