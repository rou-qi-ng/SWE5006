import { Component, OnInit } from '@angular/core';
import { PricingService } from '../../services/pricing.service';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pricing } from '../../model/pricing.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-update-pricing-page',
  templateUrl: './update-pricing-page.component.html',
  styleUrls: ['./update-pricing-page.component.css']
})
export class UpdatePricingPageComponent implements OnInit {
  public loginForm!: FormGroup;
  selectedFiles: File | null = null;
  products: Pricing | null = null;
  pricingId: number | null = null; 
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private formBuilder: FormBuilder, 
              private http: HttpClient,
              private pricingService: PricingService,
              private location: Location ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.pricingId = parseInt(params.get('pricingId') || '0', 10);
    });

    this.loginForm = this.formBuilder.group({
      pricingName: ['', Validators.required],
      pricingCost: ['', Validators.required],
      pricingAddon: ['', Validators.required],
    });

    // Fetch pricing data only if pricingId is defined
    if (this.pricingId !== null) {
      this.pricingService.getPricings1(this.pricingId).subscribe(
        (response: Pricing[]) => {
          if (response && response.length > 0) {
            this.products = response[0];
            console.log(this.products);
            this.loginForm.patchValue({
              pricingName: this.products?.pricingName || '',
              pricingCost: this.products?.pricingCost || '',
              pricingAddon: this.products?.pricingAddon || '',
            });
          } else {
            console.error('No pricing data found for id:', this.pricingId);
          }
        },
        (error) => {
          console.error('Error fetching pricing data:', error);
        }
      );
    } else {
      console.error('Pricing ID is not defined');
    }
  }

  public onSubmit() {
    if (this.loginForm.valid && this.products) {
      const newPricing: Pricing = {
        pricingId: this.pricingId ?? 0,
        pricingName: this.loginForm.get('pricingName')?.value,
        pricingCost: this.loginForm.get('pricingCost')?.value,
        pricingAddon: this.loginForm.get('pricingAddon')?.value,
        pricingServiceId: this.products.pricingServiceId || 0,
      };

      this.pricingService.updatePricing(newPricing).subscribe(
        (response) => {
          console.log('Pricing updated successfully:', response);
          this.successMessage = 'Service details saved successfully.';
          this.errorMessage = null;
          //this.router.navigate(['business', this.products?.pricingServiceId || 0]);
          this.location.back();
        },
        (error) => {
          console.error('Error updating pricing:', newPricing.pricingServiceId);
          // this.successMessage = null;
          // this.errorMessage = "Error updating";
          //this.router.navigate(['business', this.products?.pricingServiceId || 0]);
          this.location.back();
        }
      );
    } else {
      console.error('Form is invalid or pricing data is not available');
      this.successMessage = null;
      this.errorMessage = "Error updating";
    }
  }
}
