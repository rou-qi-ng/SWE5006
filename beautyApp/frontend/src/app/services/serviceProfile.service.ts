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

  getImagesBlob(serviceId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/serviceProfile/${serviceId}/portfolio`);
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

  updateServiceDetails(serviceProfile: ServiceProfile): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/serviceProfile/update`, serviceProfile);
  }

  getPortfolioByServiceId(serviceId: number): Observable<Portfolio[]> {
    return this.httpClient.get<Portfolio[]>(`${this.baseUrl}/serviceProfile/${serviceId}/portfolio`);
  }

  deletePortfolioPhoto(photoId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/serviceProfile/portfolio/${photoId}`);
  }
}