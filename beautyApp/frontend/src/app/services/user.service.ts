import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../model/user.model';
import { environment } from '../../environments/environment';
// import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Common } from '../envrionment.common';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private basUrl = environment.apiUrl +"/beautyApp/api/login"

  private basUrl2 = environment.apiUrl +"/beautyApp/api/"
  private baseUrl3 = ""

  constructor(private httpClient: HttpClient,
    private router:Router) {
  }

  getUserList(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${this.basUrl}`);
  }

  createUser(user: User): Observable<Object> {
    return this.httpClient.post(`${this.basUrl}`, user);
  }

  getUserById(id: number): Observable<User>{
    return this.httpClient.get<User>(`${this.basUrl}/${id}`);
  }

  updateUser(id:number, user:User): Observable<Object>{
    return this.httpClient.put(`${this.basUrl}/${id}`, user);
  }

  deleteUser(id:number): Observable<Object>{
    return this.httpClient.delete(`${this.basUrl}/${id}`);
  }

  getCode(token: any): Observable<any>{
    this.basUrl2 = this.basUrl2 + 'getReferralCode'+ `?token=` + token ;
    return this.httpClient.get(`${this.basUrl2}`);
  }

  retrieveSettings(token: any): Observable<any>{
    this.basUrl2 = this.basUrl2 + 'loadSettings'+ `?token=` + token ;
    return this.httpClient.get(`${this.basUrl2}`);
  }

  getVoucher(token: any): Observable<any>{
    this.baseUrl3 = this.basUrl2 + 'getVoucher'+ `?token=` + token ;
    return this.httpClient.get(`${this.baseUrl3}`);
  }

  getSettings(token: String): Observable<any>{
    console.log('this is token' + token);
    this.basUrl2 = this.basUrl2 + 'getSetting' +  `?token=` + token;
    return this.httpClient.get(`${this.basUrl2}`);
  }

  getUserIdByToken(token: string): Observable<any> {
    return this.httpClient.get<any>(`${this.basUrl2}getUserId`, { params: { token } });
  }

  getUsernameById(id: number): Observable<any>{
    return this.httpClient.get<any>(`${this.basUrl2}getUsername`, { params: { userId: id } });
  }

  
  
  
  public update(token: string,
    skinType: string,
    gender: string,
    dob: string,
    address: string): void {
    this.updateCustomer(token, skinType, gender, dob, address)
      .subscribe((token) => {
        // localStorage.setItem(this.tokenKey, token);
        this.router.navigate(['']);
      });
  }


  public updateCustomer(
    token: string,
    skinType: string,
    gender: string,
    dob: string,
    address: string
  ): Observable<string> {
    return this.httpClient.post(
      environment.apiUrl + '/updateCustomer',
      {
        sessionId: token,
        favourites: "",
        skinType: skinType,
        gender: gender,
        dob: dob,
        address: address
      },
      { responseType: 'text' }
    );
  }

}
