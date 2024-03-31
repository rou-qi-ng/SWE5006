// availability-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';
import { AvailabilityService } from '../../services/availability.service'; // Import the service
import { Availability } from '../../model/availability.model';

@Component({
  selector: 'app-availability-page',
  templateUrl: './availability-page.component.html',
  styleUrls: ['./availability-page.component.css'],
})
export class AvailabilityPageComponent implements OnInit {
  public availabilityForm!: FormGroup;
  serviceId: number | null = null; 
  serviceDetails: any; // Variable to store service details
  availabilities: Availability[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private availabilityService: AvailabilityService // Inject the service
    
  ) {}

  // ngOnInit(): void {
  //   this.getAllAvailabilitys();

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
        // Fetch availability details based on service ID
        this.getAvailabilityDetails();
      } else {
        // Handle the case when 'serviceId' is null
        console.error('Service ID is null');
      }
    });
  }
  
  getAvailabilityDetails(): void {
    if (this.serviceId) {
      this.availabilityService.getAvailabilities(this.serviceId).subscribe(
        (data: Availability[]) => { // Expect an array of Availability
          this.availabilities = data; // Assign array of availability to availabilityDetailsList
          console.log('Availability Details List:', this.availabilities);
        },
        (error: any) => {
          console.error('Error fetching availability details:', error);
        }
      );
    }
  }

  // getAllAvailabilitys(): void {
  //   this.availabilityService.getAllAvailabilitys().subscribe(
  //     (data: Availability[]) => {
  //       this.availabilitys = data;
  //       console.log('Service Profiles:', this.availabilitys);
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
  //   this.router.navigate(['/availability', serviceId]);
  // }

  logout(): void {
    this.authenticationService.logout();
  }
}
