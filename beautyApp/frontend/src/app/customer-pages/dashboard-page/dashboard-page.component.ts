import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  constructor(private authenticationService: AuthenticationService,
    private router: Router) {

 }

  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }

 logout(): void {
   this.authenticationService.logout();
 }
}
