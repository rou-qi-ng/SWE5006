import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { ServiceProfile } from '../model/serviceProfile.model';
import { Portfolio } from '../model/portfolio.model';
import { Pricing } from '../model/pricing.model';
import { Common } from '../envrionment.common';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class ServiceProfileService {
  public baseUrl = environment.apiUrl + "/beautyApp/api"; 


  constructor(public httpClient: HttpClient) {}

  // getAllServiceProfiles(): Observable<ServiceProfile[]> {
  //   return this.httpClient.get<ServiceProfile[]>(`${this.baseUrl}/serviceProfile`);
  // }

  getImagesBlob(serviceId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/serviceProfile/${serviceId}/portfolio`);
  }

  getServiceDetails(serviceId: number): Observable<ServiceProfile> {
    return this.httpClient.get<ServiceProfile>(`${this.baseUrl}/serviceProfile/${serviceId}`);
  }

  getProfileImageBlob(serviceId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/serviceProfile/${serviceId}/portfolioLogo`);
  }

  getPortfolioImagesBlob(serviceId: number): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/serviceProfile/${serviceId}/portfolioImages`);
  }

  saveServiceDetails(serviceProfile: ServiceProfile, pricingList: Pricing[], id: number): Observable<any> {
    const combinedData = { serviceProfile, pricingList };
    console.log(`${this.baseUrl}/serviceProfile/add/${id}`);
    return this.httpClient.post<any>(`${this.baseUrl}/serviceProfile/add/${id}`, combinedData);
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
    return this.httpClient.post<any>(`${this.baseUrl}/serviceProfile/update`, serviceProfile)
    .pipe(
      catchError((error) => {
        // Log the error
        console.error('Error updating service profile:', error);
        // Rethrow the error or throw a custom error message
        return throwError('Failed to update service profile. Please try again later.');
      })
    );
  }

  getPortfolioByServiceId(serviceId: number): Observable<Portfolio[]> {
    return this.httpClient.get<Portfolio[]>(`${this.baseUrl}/serviceProfile/${serviceId}/portfolio`);
  }

  deletePortfolioPhoto(photoId: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.baseUrl}/serviceProfile/portfolio/${photoId}`);
  }
}