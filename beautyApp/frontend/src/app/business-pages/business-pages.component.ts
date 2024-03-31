import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-business-pages',
  templateUrl: './business-pages.component.html',
  styleUrl: './business-pages.component.css',
  standalone: true,
  providers: [],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatFormFieldModule, MatSidenavModule, MatIconModule, ReactiveFormsModule, MatCardModule],
})
export class BusinessPagesComponent {
  public loginForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService,
    private router: Router, private formBuilder: FormBuilder) {
      

  }

 ngOnInit() {
   // Initialize the form with form controls
   this.loginForm = this.formBuilder.group({
    name: ['', Validators.required],
    service_description: ['', Validators.required],
    service_type: ['', Validators.required],
    service_location: ['', Validators.required],
    date: [''], // Date field
  });
}
routeTo(serviceName: string) {
  this.router.navigate(['service', serviceName]);
}

public onSubmit() {
  if (this.loginForm.valid) {
    // Access the form values
    const formValues = this.loginForm.value;
    console.log(formValues); // Output the form values to the console
    // You can perform further actions here, such as sending the form data to a server
  }
}

logout(){

}
}
