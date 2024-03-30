import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import './business-page.component.js';

@Component({
  selector: 'app-business-page',
  templateUrl: './business-page.component.html',
  styleUrls: ['./business-page.component.css']
})
export class BusinessPageComponent {
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {

 }

 navigateToOtherPage(): void {
  this.router.navigateByUrl('/business/bookappointment'); // Navigate to the 'other' route
}

 routeTo(serviceName: string) {
  this.router.navigate(['service', serviceName]);
}

 logout(): void {
   this.authenticationService.logout();
 }
}
