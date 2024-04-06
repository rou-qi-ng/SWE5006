// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';

import { SearchService } from '../../services/search.service'; 
import { ServiceProfile } from '../../model/serviceProfile.model';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  public searchForm!: FormGroup;

  service: string | undefined;

  searchResults: ServiceProfile[] = [];
  serviceType: string = '';
  
  constructor(
    private router: Router, 
    private route: ActivatedRoute, 
    private authenticationService: AuthenticationService,
    private searchService: SearchService) {}

   ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.serviceType = params['serviceType'];
      this.service = params["serviceType"];
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
  }



  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }

  returnToDashBoard():void{
    this.router.navigate([""]);
  }
 
  logout(): void {
    this.authenticationService.logout();
  }

  onSubmit(): void {
    // const shopName = this.searchForm.get('shopName').value;
    // console.log('Searching for shop:', shopName);
  }


}
