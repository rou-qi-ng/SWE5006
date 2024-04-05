import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private tokenKey = 'token';


  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router,
    private http: HttpClient
  ) {}
  tokenValue: string = '';
  public login(username: string, password: string): void {
    this.authenticationClient.login(username, password).subscribe((token) => {

      const jsonObject: any = JSON.parse(token);
      const tokenSubstring: string = jsonObject.token;

      // Output token
      console.log(tokenSubstring);
      localStorage.setItem(this.tokenKey, tokenSubstring);
      this.router.navigate(['/']);
      console.log("rches here");
      const storedToken = localStorage.getItem(this.tokenKey);
      console.log(storedToken);
      if (storedToken !=null){
        this.authenticationClient.saveSession(storedToken, username).subscribe((message) => {
      
          console.log("rches here 2");
          console.log(message);
        
        });
      }
    
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