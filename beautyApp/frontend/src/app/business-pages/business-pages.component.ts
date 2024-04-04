import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule} from '@angular/material/icon';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ServiceProfileService } from '../services/serviceProfile.service';
import { ServiceProfile } from '../model/serviceProfile.model';
import { Portal } from '@angular/cdk/portal';
import { Portfolio } from '../model/portfolio.model';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-business-pages',
  templateUrl: './business-pages.component.html',
  styleUrl: './business-pages.component.css',
  standalone: true,
  providers: [],
  imports: [ FormsModule, ReactiveFormsModule, CommonModule,   MatSelectModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatSidenavModule, MatIconModule, MatCardModule],
})
export class BusinessPagesComponent {
  public loginForm!: FormGroup;
  selectedFiles: File | null = null;
  products: { name: string, price: number, addon: string }[] = [];


  constructor(private authenticationService: AuthenticationService,
    private router: Router, 
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private serviceProfileService: ServiceProfileService ) {
      

  }

  addProduct(): void {
    this.products.push({ name: '', price: 0, addon: 'No'});
    const index = this.products.length - 1;
    this.loginForm.addControl(`productName${index}`, this.formBuilder.control(''));
    this.loginForm.addControl(`productPrice${index}`, this.formBuilder.control(0));
  }

  removeProduct(index: number): void {
    this.products.splice(index, 1);
    this.loginForm.removeControl(`productName${index}`);
    this.loginForm.removeControl(`productPrice${index}`);
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

  this.products.forEach((product, index) => {
    this.loginForm.addControl(`productName${index}`, this.formBuilder.control(''));
    this.loginForm.addControl(`productPrice${index}`, this.formBuilder.control(0));
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
      serviceName: this.loginForm.get('service_name')?.value,
      serviceDescription: this.loginForm.get('service_description')?.value,
      serviceType: this.loginForm.get('service_type')?.value,
      serviceLocation: this.loginForm.get('service_location')?.value,
    };
    this.serviceProfileService.saveServiceDetails(newServiceProfile).subscribe(
        (response) => {
          console.log('New ServiceProfile added successfully:', response);

          this.serviceProfileService.findServiceId(response).subscribe(
            (response) => {console.log('serviceProfile found:', response);
            if (this.selectedFiles) {
              const formData = new FormData();
              const blob = new Blob([this.selectedFiles], { type: this.selectedFiles.type });
              formData.append('serviceId', response.serviceId.toString());
              formData.append('data', blob, this.selectedFiles?.name); // Append the file
              console.log(formData);
              this.serviceProfileService.saveServiceImages(formData).subscribe(
                (response) => {console.log('New ServiceProfile added successfully:', response);});
              }
              },
            (error) => {
              console.error('Error adding ServiceProfile:', error);
              // Handle error response here
            }
          );
            
          });
          
  }
}

logout(){

}
}
