import { Component } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  public user = localStorage.getItem('username');
  

  ngOnInit(): void {
    const token = localStorage.getItem("token")
    this.getCode(token);
    
  }


  private getCode(token:any) {
    this.userService.getCode(token).subscribe(data => {
      this.refCode = data['data'];
    });
    console.log(token);
    // console.log('test');
    // console.log(this.refCode);
    
  }

  
  

  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }
  returnToDashBoard():void{
    this.router.navigate([""]);
  }
  settingsPage():void{
    this.router.navigate(["settings"]).then(()=>{
      window.location.reload();
    });
  }

 logout(): void {
   this.authenticationService.logout();
  //  localStorage.removeItem('username');
 }
}
