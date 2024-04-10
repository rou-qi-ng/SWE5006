// availability-page.component.ts
import { ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';
import { AvailabilityService } from '../../services/availability.service'; // Import the service
import { Availability } from '../../model/availability.model';
import { DateAdapter } from '@angular/material/core';
import { Appointment } from '../../model/appointment.model';
import { ServiceProfileService } from '../../services/serviceProfile.service';
import { ServiceProfile } from '../../model/serviceProfile.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-availability-page',
  templateUrl: './availability-page.component.html',
  styleUrls: ['./availability-page.component.css'],
})
export class AvailabilityPageComponent implements OnInit {
  public availabilityForm!: FormGroup;
  serviceId: number | null = null; 
  serviceDetails: any;
  profileLogos: any[] = [];
  availabilities: Availability[] = [];
  selected: Date | null; // Initialize selected property
  selectedTimeSlot: string | null;
  timeSlots: string[]; // Array to hold time slots
  appointments: Appointment[] = [];
  userId: number | null = null; 
  
  
  addHour(timeSlot: string): string {
    const [hour, minute] = timeSlot.split(':').map(Number);
    const nextHour = hour === 23 ? 0 : hour + 1;
    return `${nextHour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private availabilityService: AvailabilityService, // Inject the service
    private dateAdapter: DateAdapter<Date>,
    private serviceProfileService: ServiceProfileService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone,
    private userService: UserService,
  ) {
    this.selected = null; // Initialize selected property
    this.dateAdapter.setLocale('en'); // Set locale
    this.selectedTimeSlot = null;
    this.timeSlots = this.generateTimeSlots(); // Generate time slots
  }

  bookAppointment(): void {
    console.log('Selected Date:', this.selected);
    console.log('Selected Time Slot:', this.selectedTimeSlot);

    if (this.selected && this.selectedTimeSlot && this.serviceId !== null) {
      const appointmentData = {
        appointmentServiceId: this.serviceId,
        appointmentUserId: this.userId,   // change this to userid, now no login ppl      
        appointmentDate: this.selected,
        appointmentTime: this.selectedTimeSlot
      };

      console.log('appointmentData:', appointmentData);
  
      // Call the bookAppointment method of AvailabilityService to send the appointment data to the backend
      this.availabilityService.bookAppointmentService(this.serviceId, appointmentData).subscribe(
        (response) => {
          console.log('Appointment booked successfully:', response);
          // Optionally, perform any additional actions after successful booking
        },
        (error) => {
          console.error('Error booking appointment:', error);
          // Optionally, handle error and display message to the user
        }
      );
    } else {
      console.error('Please select a date and time slot before booking.');
      // Optionally, display a message to the user indicating that a date and time slot must be selected before booking
    }
  }


  // Function to generate time slots
  generateTimeSlots(): string[] {
    const timeSlots: string[] = [];
    for (let i = 9; i < 21; i++) { // From 9 am to 9 pm (24-hour format)
      timeSlots.push(this.formatTime(i) + ':00'); // Add start of time slot
    }
    return timeSlots;
  }

  // Function to format time in HH:mm format
  formatTime(hour: number): string {
    return ('0' + hour).slice(-2); // Add leading zero if single digit
  }

  // Function to handle selection of time slot
  selectTimeSlot(timeSlot: string): void {
    console.log('Selected time slot:', timeSlot);
    this.selectedTimeSlot = timeSlot; // Update selected time slot property
  }


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

    const token = localStorage.getItem("token");
    console.log('token:', token);
    if (token) {
      this.userService.getUserIdByToken(token).subscribe(
        (userId: number) => {
          this.userId = userId;
          console.log('User ID:', userId);
          
        },
        (error: any) => {
          console.error('Error fetching user ID:', error);
        }
      );
    }

    // Extract service ID from route parameters
    this.route.paramMap.subscribe(params => {
      const serviceIdString = params.get('serviceId');
      if (serviceIdString) {
        this.serviceId = parseInt(serviceIdString, 10); // Convert string to number
        // Fetch availability details based on service ID
        this.getAvailabilityDetails();
        this.getAppointmentDetails();
        this.getServiceDetails();
        this.getProfileImageBlob();
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

  getAppointmentDetails(): void {
    if (this.serviceId) {
      this.availabilityService.getAppointments(this.serviceId).subscribe(
        (data: Appointment[]) => {
          this.appointments = data;
          console.log('Appointment Details:', this.appointments);
        },
        (error: any) => {
          console.error('Error fetching appointment:', error);
        }
      );
    }
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

  getProfileImageBlob(): void {
    if (this.serviceId) {
        this.serviceProfileService.getProfileImageBlob(this.serviceId).subscribe(
            (data: any[]) => {
                this.profileLogos = data;
                console.log('Profile Details:', this.profileLogos);

                this.ngZone.run(() => {
                    this.cdr.detectChanges();
                });
            },
            (error: any) => {
                console.error('Error fetching Profile Images:', error);
            }
        );
    }
  }


  getBlobUrl(base64Data: string): string {
    if (base64Data) {
        const binaryData = Uint8Array.from(atob(base64Data), c => c.charCodeAt(0));
        const blob = new Blob([binaryData], { type: 'image/png' });
        return URL.createObjectURL(blob);
    } else {
        console.error("Base64 data is null or empty");
        return "";
    }
  }

  returnToDashBoard():void{
    this.router.navigate([""]);
  }
  
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
