import { Component } from '@angular/core';
import { PricingService } from '../../services/pricing.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { Pricing } from '../../model/pricing.model';

@Component({
  selector: 'app-update-pricing-page',
  templateUrl: './update-pricing-page.component.html',
  styleUrl: './update-pricing-page.component.css'
})
export class UpdatePricingPageComponent {
  public loginForm!: FormGroup;
  selectedFiles: File | null = null;
  products: Pricing | null = null;
  count: number = 0;
  pricingId: number | null = null; 
  pricing: Pricing[] | null = null;
  
  constructor(private authenticationService: AuthenticationService,
    private router: Router, 
    private route: ActivatedRoute,
    private formBuilder: FormBuilder, 
    private http: HttpClient,
    private pricingService: PricingService ) {
      this.route.paramMap.subscribe(params => {
        this.pricingId = parseInt(params.get('pricingId') ?? '', 10);
      });

      this.loginForm = this.formBuilder.group({
        pricingName: ['', Validators.required],
        pricingCost: ['', Validators.required],
        pricingAddon: ['', Validators.required],
      });

      this.pricingService.getPricings(this.pricingId ?? 1).subscribe(
        (response) => {
          console.log(response);  
          this.products = response[0];
          this.loginForm = this.formBuilder.group({
            pricingName: [this.products.pricingName, Validators.required],
            pricingCost: [this.products.pricingCost, Validators.required],
            pricingAddon: [this.products.pricingAddon, Validators.required],
          });
        });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const newPricing: Pricing = {
        pricingId: this.pricingId ?? 1, // As this is a new service, set ID to 0 or null
        pricingName: this.loginForm.get('pricingName')?.value,
        pricingCost: this.loginForm.get('pricingCost')?.value,
        pricingAddon: this.loginForm.get('pricingAddon')?.value,
        pricingServiceId: this.products?.pricingServiceId ?? 1,
      };

      this.pricingService.updatePricing(newPricing).subscribe(
        (response) => {
          console.log('New ServiceProfile added successfully:', response);
        },
        (error) => {
          console.error('Error adding ServiceProfile:', error);
        }
      );
    }
    this.router.navigate(['business', this.products?.pricingServiceId ?? 1]);
    }

  }

  

