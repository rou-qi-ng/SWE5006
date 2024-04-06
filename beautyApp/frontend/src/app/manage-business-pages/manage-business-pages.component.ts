import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceProfile } from '../model/serviceProfile.model';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-manage-business-pages',
  templateUrl: './manage-business-pages.component.html',
  styleUrl: './manage-business-pages.component.css'
})
export class ManageBusinessPagesComponent {
  // users: ServiceProfile[] | undefined;

  constructor(private authenticationService: AuthenticationService,
     private router: Router) {

  }

  ngOnInit(): void {
    // this.getUsers();
  }

  logout(): void {
    this.authenticationService.logout();
  }

  private getUsers() {
    // this.userService.getUserList().subscribe(data => {
    //   this.users = data;
    // });
  }

  updateUser(id: number) {
    this.router.navigate(['update-user', id]);
  }

  deleteUser(id: number) {
    // this.userService.deleteUser(id).subscribe(data => {
    //   console.log(data);
    //   this.getUsers();
    // });
  }

}
