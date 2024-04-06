// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ServiceProfile } from '../../model/serviceProfile.model';
import { ServiceProfileService } from '../../services/serviceProfile.service';

import { SearchService } from '../../services/search.service'; 
import { ServiceProfile } from '../../model/serviceProfile.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrls: ['./search-page.component.css']
})
export class SearchPageComponent implements OnInit {
  public searchForm!: FormGroup;

  public search: ServiceProfile[] = [];
  public searchSuccess: Boolean = true;
  service: string | null = null;
  searchResults: ServiceProfile[] = [];
  serviceType: string = '';

  constructor(private router: Router,
    private formBuilder: FormBuilder, 
     private route: ActivatedRoute, 
     private serviceProfileService: ServiceProfileService ,
     private authenticationService: AuthenticationService,
             private searchService: SearchService) {}

  ngOnInit(): void {

    this.searchForm = this.formBuilder.group({
      shopName: ['']
    });
    
     this.route.params.subscribe(params => { this.service = params['service']; 
     console.log("testttttttttttt", this.service);
     this.onSubmit();
      this.serviceType = params['serviceType'];
      if (this.serviceType) {
        // Call your search method here, assuming you have one
        this.startingSearch();
      }
    });
}

  startingSearch(): void {
    if (this.serviceType) {
      this.searchService.getResultsByType(this.serviceType).subscribe(
        (data: ServiceProfile[]) => {
          this.searchResults = data;
          console.log('Service Details:', this.searchResults);
        },
        (error: any) => {
          console.error('Error fetching service profile:', error);
        }
      );
    }

  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
    this.onSubmit();
  }

  returnToDashBoard():void{
    this.router.navigate([""]);
  }
 
  logout(): void {
    this.authenticationService.logout();
  }

  onSubmit(): void {
    const shopName = this.searchForm.value.shopName;
    console.log('Searching for shop:', shopName);
    const serviceProfile = new ServiceProfile();
    serviceProfile.name = shopName;
    
    serviceProfile.type = this.service ?? '';
    this.serviceProfileService.search(serviceProfile).subscribe(
      (response) => {
        console.log('New ServiceProfile added successfully:', response);
        this.search = Array.isArray(response) ? response : [response];
        console.log(this.search);
        this.searchSuccess = this.search && this.search[0] != null;
        console.log('test ', this.searchSuccess);
      },
      (error) => {
        console.error('Error adding ServiceProfile:', error);
        // Handle error response here
      }
    );
  }
}