import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css',
  providers: [
    
      {
        provide: NG_VALUE_ACCESSOR,
        multi:true,
        useExisting: SettingsPageComponent
      }

  ]
})
export class SettingsPageComponent implements OnInit{
  public registerForm!: FormGroup;
  public filtersLoaded!: Promise<boolean>
  public skinType! : undefined;
  public dob! : string;
  
  public gender! : undefined;
    
  public address! : undefined;
  public user = localStorage.getItem('username');
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
      // route.params.subscribe(val => {
      //   this.getCode();
      // });
      

  }
 
  
  

  ngOnInit(): void {
    // this.router.navigate([this.router.url]);
    
    this.registerForm = new FormGroup({
      skinType: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required,]),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    this.getSettings();
    
  }



  private async getSettings() {

    const token = localStorage.getItem("token")
    if (token != null){
      this.userService.getSettings(token).subscribe(data => {
        this.gender = data['data']['gender'];
        this.skinType = data['data']['skinType'];
        this.address = data['data']['address'];
        this.dob = data['data']['dob'];
      });
       
      console.log('test');
      console.log(this.gender);
      this.filtersLoaded = Promise.resolve(true);
      // console.log(dat?a);
    }
    

  }

  public onSubmit() {
    const token = localStorage.getItem("token")
    
    if (token != null){
      this.userService.update(
        token,
        this.registerForm.get('skinType')!.value,
        this.registerForm.get('gender')!.value,
        this.dob,
        this.registerForm!.get('address')!.value
      );
    }
  }

  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }
  returnToDashBoard():void{
    this.router.navigate([""]).then(()=>{
      window.location.reload();
    });
  }

 logout(): void {
   this.authenticationService.logout();
  //  localStorage.removeItem('username');
 }
}
