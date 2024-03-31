// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css',
})
export class SearchPageComponent implements OnInit {
  public searchForm!: FormGroup;

  service: string | undefined;
  constructor(private router: Router,
    private formBuilder: FormBuilder, 
     private route: ActivatedRoute, private authenticationService: AuthenticationService,) {}

  ngOnInit(): void {
     this.route.params.subscribe(params => { this.service = params['service']; });
     this.searchForm = this.formBuilder.group({
      shopName: ['']
      //date: [''], // Date field
    });
  }

  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }
 
  logout(): void {
    this.authenticationService.logout();
  }

  onSubmit(): void {
    const shopName = this.searchForm.value.shopName;
    console.log('Searching for shop:', shopName);
  }


}
