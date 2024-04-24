import { ChangeDetectorRef, Component, NgZone } from '@angular/core';
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
import { UserService } from '../services/user.service';

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
  // selectedFiles: File[] | null = null;
  portfolioFiles: File[] | null = null;
  logoFile: File | null = null;
  products: Pricing[] = [];
  count: number = 0;
  serviceId: number | null = null; 
  serviceDetails: ServiceProfile | null = null;
  pricing: Pricing[] | null = null;
  portfolioData: Portfolio[] = [];
  images: any[] = [];
  image: any[] = [];
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userId: number | null = null; 
  products1: Pricing[] = [];
  public productName: string = '';
  public productPrice: number = 0;
  public productAddon: string = 'No';

  constructor(private authenticationService: AuthenticationService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private serviceProfileService: ServiceProfileService,
    private pricingService: PricingService,
    private cdr: ChangeDetectorRef,
    private userService: UserService,
    private ngZone: NgZone ) {
  }

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const serviceIdString = params.get('serviceId');
    if (serviceIdString) {
      this.serviceId = parseInt(serviceIdString, 10); // Convert string to number
    } else {
     this.serviceId = null
      console.error('Service ID is null');
    }
  });
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

  console.log(this.serviceId);
  this.loginForm = this.formBuilder.group({
    service_name: ['', Validators.required],
    service_description: ['', Validators.required],
    service_type: ['', Validators.required],
    service_location: ['', Validators.required],
    //date: [''], // Date field
  });
  if (this.serviceId) {
    this.loadPortfolioData();
  }
  if (this.serviceId != null){
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

        this.pricingService.getPricings(this.serviceId ?? 0).subscribe(
          (response) => {
            console.log(response);  
            this.products1 = response;
            console.log("productsss"+this.products1);
          },
          (error) => {
            this.products1 = [];
            console.log("productsss"+this.products1.length);
          });
          console.log("productsss"+this.products.length);

});

  }

  // this.products.forEach((product, index) => {
  //   this.loginForm.addControl(`productName${index}`, this.formBuilder.control(''));
  //   this.loginForm.addControl(`productPrice${index}`, this.formBuilder.control(0));
  //   this.loginForm.addControl(`productAddon${index}`, this.formBuilder.control('No'));
  // });

  //this.addProduct();
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

loadPortfolioData(): void {
  this.serviceProfileService.getPortfolioByServiceId(this.serviceId ?? 1).subscribe(
    (response) => {
      console.log(response)
      this.portfolioData = response;
    },
    (error) => {
      console.error('Error fetching portfolio data:', error);
    }
  );
  if (this.serviceId) {
    this.serviceProfileService.getImagesBlob(this.serviceId).subscribe(
        (data: any[]) => {
            this.images = data;
            console.log('Images Details:', this.images);

            // Run change detection within ngZone
            this.ngZone.run(() => {
                this.cdr.detectChanges();
            });
        },
        (error: any) => {
            console.error('Error fetching Images:', error);
        }
    );

    this.serviceProfileService.getImagesBlob1(this.serviceId).subscribe(
      (data: any[]) => {
          this.image = data;
          console.log('Images Details:', this.images);

          // Run change detection within ngZone
          this.ngZone.run(() => {
              this.cdr.detectChanges();
          });
      },
      (error: any) => {
          console.error('Error fetching Images:', error);
      }
  );
}
}


deletePhoto(photoId: number): void {
  console.log(photoId);
  this.serviceProfileService.deletePortfolioPhoto(photoId).subscribe(
    (response) => {
      // Reload the portfolio data after deletion
      console.log(response);
      this.loadPortfolioData();
    },
    (error) => {
      console.error('Error deleting portfolio photo:', error);
      //this.errorMessage = 'Error deleting portfolio photo:';
    }
  );
  this.router.navigate(['business', this.serviceId]);
}

addProduct(): void {
  const newProduct: Pricing = {
    pricingId: this.products.length + 1,
    pricingServiceId: this.serviceId ?? 1, 
    pricingName: this.productName,
    pricingCost: this.productPrice,
    pricingAddon: this.productAddon
  };

  this.products.push(newProduct);
  // Clear input fields after adding the product
  this.productName = '';
  this.productPrice = 0;
  this.productAddon = 'No';
}
//   // console.log(this.count);
//   // console.log(`productName${this.products.length}`);
//   // let index = this.products.length;
//   // if (this.products.length === 0){
//   //    index = 0;
//   // }
//   // else{
//   //   index = index -1
//   // }
//   // const newProduct: Pricing = {
//   //   pricingId: 0,
//   //   pricingServiceId: this.serviceId ?? 1, // Make sure to set the correct pricingServiceId
//   //   pricingName: this.loginForm.getRawValue()[`productName${index}`] || '',
//   //   pricingCost: this.loginForm.getRawValue()[`productPrice${index}`] || 0,
//   //   pricingAddon: this.loginForm.getRawValue()[`productAddon${index}`] === 'yes' ? 'Y' : 'N'
//   // };

//   // this.products.push(newProduct);
//   // console.log(this.products);
//   // console.log("hi");
//   // console.log(newProduct);
//   // //const index = this.products.length - 1;
//   // this.loginForm.addControl(`productName${index}`, this.formBuilder.control(''));
//   // this.loginForm.addControl(`productPrice${index}`, this.formBuilder.control(0));
//   // this.loginForm.addControl(`productAddon${index}`, this.formBuilder.control('No'));
//   console.log(this.products);
//   const index = this.products.length;
//   console.log(index);
//   const productNameControlName = `productName${index}`;
//   const productPriceControlName = `productPrice${index}`;
//   const productAddonControlName = `productAddon${index}`;

//   const productNameFormControl = new FormControl('');
//   const productPriceFormControl = new FormControl(0);
//   const productAddonFormControl = new FormControl('No');
//   console.log(productNameControlName);
//   this.loginForm.addControl(productNameControlName, productNameFormControl);
//   this.loginForm.addControl(productPriceControlName, productPriceFormControl);
//   this.loginForm.addControl(productAddonControlName, productAddonFormControl);

//   // const newProduct: Pricing = {
//   //   pricingId: 0,
//   //   pricingServiceId: this.serviceId ?? 1, // Make sure to set the correct pricingServiceId
//   //   pricingName: productNameFormControl.value || '',
//   //   pricingCost: productPriceFormControl.value|| 0,
//   //   pricingAddon: productAddonFormControl.value === 'yes' ? 'Y' : 'N'
//   // };

//   // const newProduct: Pricing = {
//   //     pricingId: 0,
//   //     pricingServiceId: this.serviceId ?? 1, // Make sure to set the correct pricingServiceId
//   //     pricingName: this.loginForm.getRawValue()[`productName${index}`] || '',
//   //     pricingCost: this.loginForm.getRawValue()[`productPrice${index}`] || 0,
//   //     pricingAddon: this.loginForm.getRawValue()[`productAddon${index}`] === 'yes' ? 'Y' : 'N'
//   //   };

//   // After adding form controls to the form dynamically
// const newProduct: Pricing = {
//   pricingId: 0,
//   pricingServiceId: this.serviceId ?? 1,
//   pricingName: productNameFormControl.value || '',
//   pricingCost: productPriceFormControl.value || 0,
//   pricingAddon: productAddonFormControl.value === 'Yes' ? 'Y' : 'N' // Make sure to match the casing with your form values
// };


//   this.products.push(newProduct);


// }



removeProduct(index: number): void {
  this.products.splice(index, 1);
  this.loginForm.removeControl(`productName${index}`);
  this.loginForm.removeControl(`productPrice${index}`);
  this.loginForm.removeControl(`productAddon${index}`);
}

routeTo(serviceName: string) {
  this.router.navigate(['service', serviceName]);
}


routeService(serviceId: string){
  this.router.navigate(['serviceProfile', serviceId]);
}
returnToDashBoard():void{
  this.router.navigate([""]).then(()=>{
    window.location.reload();
  });
}
settingsPage():void{
  this.router.navigate(["settings"]).then(()=>{
    window.location.reload();
  });
}

// onFileSelected(event: any) {
//   this.selectedFiles = event.target.files;
// }

onPortfolioSelected(event: any) {
  this.portfolioFiles = event.target.files;
  console.log("pics");
}

onLogoSelected(event: any) {
  this.logoFile = event.target.files[0]; // Only single file for logo
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
      console.log("hoi"+this.portfolioFiles);
      console.log("hoi"+this.logoFile);
      //this.products.shift();
      console.log("hoi"+this.products); 
      if (this.products && this.products.length > 0) {
        this.products.forEach((product) => {
        product.pricingServiceId = 1;
        product.pricingAddon = product.pricingAddon === 'Y' ? 'Y' : 'N'; // Convert 'yes' to 'Y' and 'no' to 'N'
          console.log(product);     
        });
      }
      this.serviceProfileService.saveServiceDetails(newServiceProfile, this.products, this.userId ?? 11).subscribe(
        (response) => {
          console.log('New ServiceProfile added successfully:', response);

          if (this.portfolioFiles && this.portfolioFiles.length > 0) {
            // Handle portfolio photos
            for (let i = 0; i < this.portfolioFiles.length; i++) {
              const formData = new FormData();
              const blob = new Blob([this.portfolioFiles[i]], { type: this.portfolioFiles[i].type });
              formData.append('serviceId', response.serviceId.toString());
              formData.append('data', blob, this.portfolioFiles[i]?.name); 
              formData.append('logo', '0'); // Portfolio photos are not logos
              console.log(formData);
              this.serviceProfileService.saveServiceImages(formData).subscribe(
                (imageResponse) => {
                  console.log('Portfolio Photos uploaded successfully:', imageResponse);
                  // Assuming imageResponse contains the success message as plain text
                  if (imageResponse && typeof imageResponse === 'string') {
                    console.log('Server response:', imageResponse);
                    // Handle the success message as needed
                  } else {
                    console.error('Invalid server response:', imageResponse);
                  }
                },
                (imageError) => {
                  console.error('Error adding Portfolio Photos:', imageError);
                }
              );
            }
          }
          if (this.logoFile) {
            // Handle logo
            const formData = new FormData();
            const blob = new Blob([this.logoFile], { type: this.logoFile.type });
            formData.append('serviceId', response.serviceId.toString());
            formData.append('data', blob, this.logoFile?.name); // Append the file
            formData.append('logo', '1'); // This is the logo
            console.log(formData);
            this.serviceProfileService.saveServiceImages(formData).subscribe(
              (imageResponse) => {
                console.log('Logo uploaded successfully:', imageResponse);
                // Assuming imageResponse contains the success message as plain text
                if (imageResponse && typeof imageResponse === 'string') {
                  console.log('Server response:', imageResponse);
                  // Handle the success message as needed
                } else {
                  console.error('Invalid server response:', imageResponse);
                }
              },
              (imageError) => {
                console.error('Error adding logo:', imageError);
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
              //this.router.navigate(['manage']);
            },
        (error) => {
          console.error('Error adding ServiceProfile:', error);
          this.successMessage = null;
          this.errorMessage = 'Error saving service details. Please try again.';

        }
      );
        //this.loginForm.reset();
        this.router.navigate(['manage']);
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
          // this.successMessage = 'Service details saved successfully.';
          // this.errorMessage = null;
          
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
              //this.router.navigate(['manage']);
        // }
            },
        (error) => {
          console.error('Error adding ServiceProfile:', error);
             this.successMessage = 'Service details saved successfully.';
             this.errorMessage = null;
             console.log("ji"+this.portfolioFiles?.length);
          if (this.portfolioFiles && this.portfolioFiles.length > 0) {
            // Handle portfolio photos
            console.log("ji");
            for (let i = 0; i < this.portfolioFiles.length; i++) {
              const formData = new FormData();
              const blob = new Blob([this.portfolioFiles[i]], { type: this.portfolioFiles[i].type });
              formData.append('serviceId', this.serviceId?.toString() ?? "1");
              formData.append('data', blob, this.portfolioFiles[i]?.name); 
              formData.append('logo', '0'); // Portfolio photos are not logos
              console.log(formData);
              this.serviceProfileService.saveServiceImages(formData).subscribe(
                (imageResponse) => {
                  console.log('Portfolio Photos uploaded successfully:', imageResponse);
                  // Assuming imageResponse contains the success message as plain text
                  if (imageResponse && typeof imageResponse === 'string') {
                    console.log('Server response:', imageResponse);
                    // Handle the success message as needed
                  } else {
                    console.error('Invalid server response:', imageResponse);
                  }
                },
                (imageError) => {
                  console.error('Error adding Portfolio Photos:', imageError);
                }
              );
            }
          }
          if (this.logoFile) {
            // Handle logo
            const formData = new FormData();
            const blob = new Blob([this.logoFile], { type: this.logoFile.type });
            formData.append('serviceId', this.serviceId?.toString() ?? "1");
            formData.append('data', blob, this.logoFile?.name); // Append the file
            formData.append('logo', '1'); // This is the logo
            console.log(formData);
            this.serviceProfileService.saveServiceImages(formData).subscribe(
              (imageResponse) => {
                console.log('Logo uploaded successfully:', imageResponse);
                // Assuming imageResponse contains the success message as plain text
                if (imageResponse && typeof imageResponse === 'string') {
                  console.log('Server response:', imageResponse);
                  // Handle the success message as needed
                } else {
                  console.error('Invalid server response:', imageResponse);
                }
              },
              (imageError) => {
                console.error('Error adding logo:', imageError);
              }
            );
          }
          if (this.products && this.products.length > 0) {
            this.products.forEach((product) => {
            product.pricingServiceId = this.serviceId ?? 1;
            product.pricingAddon = product.pricingAddon === 'Yes' ? 'Y' : 'N'; // Convert 'yes' to 'Y' and 'no' to 'N'
              //console.log(product);     
            });
          }
          console.log(this.products);
          this.pricingService.addPricings(this.products).subscribe();
        }
      );
      //this.loginForm.reset();
      //window.location.reload(); 
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


