import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrl: './settings-page.component.css'
})
export class SettingsPageComponent implements OnInit{
  public registerForm!: FormGroup;
  constructor(private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService) {
      // route.params.subscribe(val => {
      //   this.getCode();
      // });

 }
  public skinType! : undefined;
  public dob! : string;
  
  public gender! : undefined;
    
  public address! : undefined;
  public user = localStorage.getItem('username');
  
  

  ngOnInit(): void {

    this.getSettings();
    this.registerForm = new FormGroup({
      skinType: new FormControl('', Validators.required),
      dob: new FormControl('', [Validators.required,]),
      gender: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
    });
    
  }



  private getSettings() {

    const token = localStorage.getItem("token")
    if (token != null){
      this.userService.getSettings(token).subscribe(data => {
        this.gender = data['data']['gender'];
        this.skinType = data['data']['skinType'];
        this.address = data['data']['address'];
        this.dob = data['data']['dob'];
      });
       // Set form control values after getting settings
       this.registerForm.patchValue({
        skinType: this.skinType,
        dob: this.dob,
        gender: this.gender,
        address: this.address
      });
      console.log('test');
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
    this.router.navigate([""]);
  }

 logout(): void {
   this.authenticationService.logout();
  //  localStorage.removeItem('username');
 }
}
