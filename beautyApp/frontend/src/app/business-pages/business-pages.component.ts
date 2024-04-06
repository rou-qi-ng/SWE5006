import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceProfileService } from '../services/serviceProfile.service'; // Import the service
import { ServiceProfile } from '../model/serviceProfile.model';
import { Portal } from '@angular/cdk/portal';
import { Portfolio } from '../model/portfolio.model';

@Component({
  selector: 'app-business-pages',
  templateUrl: './business-pages.component.html',
  styleUrl: './business-pages.component.css',
  standalone: true,
  providers: [],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatSidenavModule, MatIconModule, ReactiveFormsModule, MatCardModule],
})
export class BusinessPagesComponent {
  public loginForm!: FormGroup;
  selectedFiles: File | null = null;


  constructor(private authenticationService: AuthenticationService,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private serviceProfileService: ServiceProfileService ) {
      

  }

 ngOnInit() {
   // Initialize the form with form controls
   this.loginForm = this.formBuilder.group({
    service_name: ['', Validators.required],
    service_description: ['', Validators.required],
    service_type: ['', Validators.required],
    service_location: ['', Validators.required],
    //date: [''], // Date field
  });
}

routeTo(serviceName: string) {
  this.router.navigate(['service', serviceName]);
}

onFileSelected(event: any) {
  this.selectedFiles = event.target.files[0];
}

public onSubmit() {
  if (this.loginForm.valid) {
    // Access the form values
    const formValues = this.loginForm.value;
    const newServiceProfile: ServiceProfile = {
      serviceId: 0, // As this is a new service, set ID to 0 or null
      name: this.loginForm.get('service_name')?.value,
      description: this.loginForm.get('service_description')?.value,
      type: this.loginForm.get('service_type')?.value,
      location: this.loginForm.get('service_location')?.value,
    };
    console.log(newServiceProfile); // Output the form values to the console
    // You can perform further actions here, such as sending the form data to a server
    this.serviceProfileService.saveServiceDetails(newServiceProfile).subscribe(
        (response) => {
          console.log('New ServiceProfile added successfully:', response);
          // Handle successful response here

          // const portfolio: Portfolio = {
          //   serviceId: 1,
          //   data: this.selectedFiles
          // };
          if (this.selectedFiles) {
          const formData = new FormData();
          const blob = new Blob([this.selectedFiles], { type: this.selectedFiles.type });
          formData.append('serviceId', '1');
          formData.append('data', blob, this.selectedFiles?.name); // Append the file
          this.serviceProfileService.saveServiceImages(formData).subscribe(
            (response) => {console.log('New ServiceProfile added successfully:', response);});
        
          }
          },
        (error) => {
          console.error('Error adding ServiceProfile:', error);
          // Handle error response here
        }
      );
  }
}

logout(){

}
}
