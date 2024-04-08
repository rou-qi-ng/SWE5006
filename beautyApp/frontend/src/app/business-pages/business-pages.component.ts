import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { ActivatedRoute, Router } from '@angular/router';
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
import { PricingService } from '../services/pricing.service';
import { Pricing } from '../model/pricing.model';

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
  products: Pricing[] = [];
  count: number = 0;
  serviceId: number | null = null; 
  serviceDetails: ServiceProfile | null = null;
  pricing: Pricing[] | null = null;

  constructor(private authenticationService: AuthenticationService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private serviceProfileService: ServiceProfileService,
    private pricingService: PricingService ) {
      

  }

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const serviceIdString = params.get('serviceId');
    if (serviceIdString) {
      this.serviceId = parseInt(serviceIdString, 10); // Convert string to number
    } else {
      // Handle the case when 'serviceId' is null
      console.error('Service ID is null');
    }
  });
  console.log(this.serviceId);
  this.loginForm = this.formBuilder.group({
    service_name: ['', Validators.required],
    service_description: ['', Validators.required],
    service_type: ['', Validators.required],
    service_location: ['', Validators.required],
    //date: [''], // Date field
  });
  
  this.serviceProfileService.getServiceDetails(this.serviceId ?? 1).subscribe(
    (response) => {
      console.log(response);
      this.serviceDetails = response;
   // Initialize the form with form controls
   if (this.serviceId != null){
    //console.log("hello"+this.serviceDetails?.serviceName ?? '');
  this.loginForm = this.formBuilder.group({
    service_name: [this.serviceDetails?.serviceName ?? '', Validators.required],
    service_description: [this.serviceDetails?.serviceDescription ?? '', Validators.required],
    service_type: [this.serviceDetails?.serviceType ?? '', Validators.required],
    service_location: [this.serviceDetails?.serviceLocation ?? '', Validators.required],
    //date: [''], // Date field
  });
  }
  else{
  this.loginForm = this.formBuilder.group({
    service_name: ['', Validators.required],
    service_description: ['', Validators.required],
    service_type: ['', Validators.required],
    service_location: ['', Validators.required],
    //date: [''], // Date field
  });
  }

  this.pricingService.getPricings(this.serviceId ?? 1).subscribe(
    (response) => {
      console.log(response);  
      this.products = response;
    });

});



  // this.products.forEach((product, index) => {
  //   this.loginForm.addControl(`productName${index}`, this.formBuilder.control(''));
  //   this.loginForm.addControl(`productPrice${index}`, this.formBuilder.control(0));
  //   this.loginForm.addControl(`productAddon${index}`, this.formBuilder.control('No'));
  // });

  this.addProduct();
}

addProduct(): void {
  console.log(this.count);
  console.log(`productName${this.products.length}`);
  const newProduct: Pricing = {
    pricingId: 0,
    pricingServiceId: 47, // Make sure to set the correct pricingServiceId
    pricingName: this.loginForm.getRawValue()[`productName${this.products.length-1}`] || '',
    pricingCost: this.loginForm.getRawValue()[`productPrice${this.products.length-1}`] || 0,
    pricingAddon: this.loginForm.getRawValue()[`productAddon${this.products.length-1}`] === 'yes' ? 'Y' : 'N'
  };

  this.products.push(newProduct);
  console.log(this.products);
  console.log("hi");
  console.log(newProduct);
  const index = this.products.length - 1;
  this.loginForm.addControl(`productName${index}`, this.formBuilder.control(''));
  this.loginForm.addControl(`productPrice${index}`, this.formBuilder.control(0));
  this.loginForm.addControl(`productAddon${index}`, this.formBuilder.control('No'));
}



removeProduct(index: number): void {
  this.products.splice(index, 1);
  this.loginForm.removeControl(`productName${index}`);
  this.loginForm.removeControl(`productPrice${index}`);
  this.loginForm.removeControl(`productAddon${index}`);
}

routeTo(serviceName: string) {
  this.router.navigate(['service', serviceName]);
}

onFileSelected(event: any) {
  this.selectedFiles = event.target.files[0];
}

public onSubmit() {
  console.log("submitinggggggg");
  if (this.loginForm.valid) {
    if (this.serviceId == null) {
      console.log("inserting");
      const formValues = this.loginForm.value;
      const newServiceProfile: ServiceProfile = {
        serviceId: 0, // As this is a new service, set ID to 0 or null
        serviceName: this.loginForm.get('service_name')?.value,
        serviceDescription: this.loginForm.get('service_description')?.value,
        serviceType: this.loginForm.get('service_type')?.value,
        serviceLocation: this.loginForm.get('service_location')?.value,
      };
      console.log(newServiceProfile ); 
      console.log(this.selectedFiles);
      this.products.shift();
      console.log(this.products); 
      if (this.products && this.products.length > 0) {
        this.products.forEach((product) => {
        product.pricingServiceId = 1;
        product.pricingAddon = product.pricingAddon === 'Yes' ? 'Y' : 'N'; // Convert 'yes' to 'Y' and 'no' to 'N'
          console.log(product);     
        });
      }
      this.serviceProfileService.saveServiceDetails(newServiceProfile, this.products).subscribe(
        (response) => {
          console.log('New ServiceProfile added successfully:', response);

              if (this.selectedFiles) {
                const formData = new FormData();
                const blob = new Blob([this.selectedFiles], { type: this.selectedFiles.type });
                formData.append('serviceId', response.serviceId.toString());
                formData.append('data', blob, this.selectedFiles?.name); // Append the file
                console.log(formData);
                this.serviceProfileService.saveServiceImages(formData).subscribe(
                  (imageResponse) => {
                    console.log('New ServiceProfile added successfully:', imageResponse);
                  },
                  (imageError) => {
                    console.error('Error adding service images:', imageError);
                  }
                );
              }
              // Check if products exist and add them
              // if (this.products && this.products.length > 0) {
              //   this.products.forEach((product) => {
              //     product.pricingServiceId = response.serviceId;
              //     product.pricingAddon = product.pricingAddon === 'Yes' ? 'Y' : 'N'; // Convert 'yes' to 'Y' and 'no' to 'N'
              //     console.log(product); 
              //   });
              //   this.pricingService.addPricings(this.products).subscribe(
              //     (pricingResponse) => { console.log('Products added successfully:', pricingResponse); },
              //     (pricingError) => { console.error('Error adding products:', pricingError); }
              //   );
              // }
            },
        (error) => {
          console.error('Error adding ServiceProfile:', error);
        }
      );
        this.loginForm.reset();
      window.location.reload(); 
    }
    else{
      console.log("updatinggg");
      const newServiceProfile: ServiceProfile = {
        serviceId: this.serviceId ?? 1,
        serviceName: this.loginForm.get('service_name')?.value,
        serviceDescription: this.loginForm.get('service_description')?.value,
        serviceType: this.loginForm.get('service_type')?.value,
        serviceLocation: this.loginForm.get('service_location')?.value,
      };
      console.log(newServiceProfile ); 
      this.serviceProfileService.updateServiceDetails(newServiceProfile).subscribe(
        (response) => {
          console.log('New ServiceProfile added successfully:', response);
        },
        (error) => {
          console.error('Error adding ServiceProfile:', error);
        }
      );
      this.loginForm.reset();
      window.location.reload(); 
    }
}
}


logout(): void {
  this.authenticationService.logout();
}

deletePricing(id: number) {
  this.pricingService.deletePricing(id).subscribe(data => {
    console.log(data);
  });
  window.location.reload(); 

}

updatePricing(id: number) {
  this.router.navigate(['updatePricing', id]);
}

}


