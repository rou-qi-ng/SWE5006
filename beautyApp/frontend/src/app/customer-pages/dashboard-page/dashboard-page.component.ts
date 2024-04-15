import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';
// import { Appointment } from '../../model/appointment.model';

interface Voucher {
  voucherName: string;
  voucherCode: string;
}

interface Appointment{
  appointmentServiceId: string;
  appointmentDate: string;
  appointmentTime: string;
  appointmentName: string;
}

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.css'
})
export class DashboardPageComponent {
  constructor(private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute) {
      // route.params.subscribe(val => {
      //   this.getCode();
      // });

 }


  public refCode! : undefined;
  vouchers: Voucher[] = [];
  appointments: Appointment[] = [];
  public user = localStorage.getItem('username');
  

  ngOnInit(): void {
    const token = localStorage.getItem("token")
    // this.getCode(token);
    // this.getVoucher(token);
    this.loadSettings(token);
    
  }


  private loadSettings(token:any) {
    this.userService.retrieveSettings(token).subscribe(data => {
      console.log(data);
      this.refCode = data['referral'];
      this.vouchers = data['vouchers'];
      this.appointments= data['appointment'];
    });
    console.log(token);
    
    // console.log('test');
    // console.log(this.refCode);
    
  }

  private getCode(token:any) {
    this.userService.getCode(token).subscribe(data => {
      this.refCode = data['data'];
    });
    console.log(token);
    
    // console.log('test');
    // console.log(this.refCode);
    
  }

  // private getVoucher(token:any) {
  //   this.userService.getVoucher(token).subscribe(data2 => {
  //     console.log('this is test',data2);
  //     this.vouchers.push({
  //       "name": data2["name"],
  //       "code": data2["code"]
  //     });
  //   });
    
  //   // console.log('test');
  //   // console.log(this.refCode);
    
  // }

  
  

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

  registerPage():void{
    this.router.navigate(["business"]).then(()=>{
      window.location.reload();
    });
  }

 logout(): void {
   this.authenticationService.logout();
  //  localStorage.removeItem('username');
 }
}
