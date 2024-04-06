import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProfile } from '../model/serviceProfile.model';
import { Portfolio } from '../model/portfolio.model';
import { Pricing } from '../model/pricing.model';

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

  saveServiceDetails(serviceProfile: ServiceProfile, pricingList: Pricing[]): Observable<ServiceProfile> {
    const combinedData = { serviceProfile, pricingList };
    return this.httpClient.post<ServiceProfile>(`${this.baseUrl}/serviceProfile/add`, combinedData);
  }  

  saveServiceImages(portfolio: FormData): Observable<ServiceProfile> {
    return this.httpClient.post<ServiceProfile>(`${this.baseUrl}/portfolio/upload`, portfolio);
  }

  findServiceId(serviceProfile: ServiceProfile): Observable<ServiceProfile> {
    return this.httpClient.post<ServiceProfile>(`${this.baseUrl}/serviceProfile/find`, serviceProfile);
  }
  getServiceList(userId: number): Observable<ServiceProfile[]> {
    return this.httpClient.get<ServiceProfile[]>(`${this.baseUrl}/serviceProfile/getServiceList?userId=${userId}`);
  }  

  deleteService(userId: number, serviceId: number): Observable<ServiceProfile> {
    return this.httpClient.get<ServiceProfile>(`${this.baseUrl}/serviceProfile/delete?userId=${userId}&serviceId=${serviceId}`);
  }
}