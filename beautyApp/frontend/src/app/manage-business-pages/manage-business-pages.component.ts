import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProfile } from '../model/serviceProfile.model';
import { AuthenticationService } from '../services/authentication.service';
import { ServiceProfileService } from '../services/serviceProfile.service';
import { AvailabilityService } from '../services/availability.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-manage-business-pages',
  templateUrl: './manage-business-pages.component.html',
  styleUrl: './manage-business-pages.component.css'
})
export class ManageBusinessPagesComponent {
  service: ServiceProfile[] | undefined;
  serviceStatus: string[] | null = null;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  userId: number | null = null; 
  
  constructor(private serviceProfileService: ServiceProfileService, 
    private authenticationService: AuthenticationService,
    private availabilityService: AvailabilityService,
    private userService: UserService,
     private router: Router) {
    
  }

  ngOnInit(): void {
    this.getService();
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
  }

  logout(): void {
    this.authenticationService.logout();
  }

  private getService() {
    this.serviceProfileService.getServiceList(this.userId??11).subscribe(data => {
      this.service = data;
      data.forEach((product) => {
        this.availabilityService.getServiceStatus(product?.serviceId ?? 0).subscribe(data1 => {
          console.log(data1);
          product.serviceStatus = data1[0]["availabilityStatus"] || "N";
        }); 
        console.log(this.service);   
        });
    });
    

  }

  updateService(id: number) {
    this.router.navigate(['business', id]);
  }

  disableService(id: number) {
    this.availabilityService.updateServiceStatus(id??0).subscribe(data => {
      this.getService();
    });
    window.location.reload();
  }

  enableService(id: number) {
    this.availabilityService.updateServiceStatus(id??0).subscribe(data => {
      this.getService();
    });
    window.location.reload();
  }

  deleteService(id: number) {
    this.serviceProfileService.deleteService(this.userId ?? 11, id).subscribe(data => {
      console.log(data);
      this.getService();
    });
    window.location.reload();
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

  registerPage():void{
    this.router.navigate(["business"]).then(()=>{
      window.location.reload();
    });
  }

  
  managePage():void{
    this.router.navigate(["manage"]).then(()=>{
      window.location.reload();
    });
  }

  
  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }

  routeService(serviceId: string){
    this.router.navigate(['serviceProfile', serviceId]);
  }

  routeBusiness(serviceId: number){
    this.router.navigate(['business', serviceId]);
  }



}
