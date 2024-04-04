import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';
  private user: User | null = null;

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password).subscribe((token) => {
      localStorage.setItem(this.tokenKey, token);
      this.router.navigate(['/']);
    });
  }

  public register(username: string, userType: string, password: string): void {
    this.authenticationClient
      .register(username, userType, password)
      .subscribe((token) => {
        localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['/login']);
      });
  }

  public getUser(): User | null {
    return this.user;
  }
  
  public logout() {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(['/home']);
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}