import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProfile } from '../model/serviceProfile.model';
import { Portfolio } from '../model/portfolio.model';

@Injectable({
  providedIn: 'root'
})

export class ServiceProfileService {
  private baseUrl = "http://localhost:8401/beautyApp/api"; 

  constructor(private httpClient: HttpClient) {}

  // getAllServiceProfiles(): Observable<ServiceProfile[]> {
  //   return this.httpClient.get<ServiceProfile[]>(`${this.baseUrl}/serviceProfile`);
  // }

  getServiceDetails(serviceId: number): Observable<ServiceProfile> {
    return this.httpClient.get<ServiceProfile>(`${this.baseUrl}/serviceProfile/${serviceId}`);
  }

  saveServiceDetails(serviceProfile: ServiceProfile): Observable<ServiceProfile> {
    return this.httpClient.post<ServiceProfile>(`${this.baseUrl}/serviceProfile/add`, serviceProfile);
  }

  saveServiceImages(portfolio: FormData): Observable<ServiceProfile> {
    return this.httpClient.post<ServiceProfile>(`${this.baseUrl}/portfolio/upload`, portfolio);
  }

  findServiceId(serviceProfile: ServiceProfile): Observable<ServiceProfile> {
    return this.httpClient.post<ServiceProfile>(`${this.baseUrl}/serviceProfile/find`, serviceProfile);
  }
}