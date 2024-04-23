import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProfile } from '../model/serviceProfile.model';
import { Common } from '../envrionment.common';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private baseUrl = environment.apiUrl + "/beautyApp/api"; 

  constructor(private httpClient: HttpClient) {}

  // getAllSearchs(): Observable<Search[]> {
  //   return this.httpClient.get<Search[]>(`${this.baseUrl}/search`);
  // }

  getResultsByType(serviceType: string): Observable<ServiceProfile[]> {
    return this.httpClient.get<ServiceProfile[]>(`${this.baseUrl}/service/${serviceType}`);
  }

  search(serviceName: String, serviceType: String): Observable<ServiceProfile[]> {
    return this.httpClient.get<ServiceProfile[]>(`${this.baseUrl}/service/${serviceType}/search/${serviceName}`);
  }
}