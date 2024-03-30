import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServiceProfile } from '../model/serviceProfile.model';

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
}