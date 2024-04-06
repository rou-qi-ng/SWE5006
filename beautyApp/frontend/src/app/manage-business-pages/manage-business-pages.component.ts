import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProfile } from '../model/serviceProfile.model';
import { AuthenticationService } from '../services/authentication.service';
import { ServiceProfileService } from '../services/serviceProfile.service';

@Component({
  selector: 'app-manage-business-pages',
  templateUrl: './manage-business-pages.component.html',
  styleUrl: './manage-business-pages.component.css'
})
export class ManageBusinessPagesComponent {
   service: ServiceProfile[] | undefined;

  constructor(private serviceProfileService: ServiceProfileService, private authenticationService: AuthenticationService,
     private router: Router) {

  }

  ngOnInit(): void {
    this.getService();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  private getService() {
    this.serviceProfileService.getServiceList(11).subscribe(data => {
      this.service = data;
    });
  }

  updateService(id: number) {
    this.router.navigate(['business', id]);
  }

  deleteService(id: number) {
    this.serviceProfileService.deleteService(11, id).subscribe(data => {
      console.log(data);
      this.getService();
    });
  }

}
