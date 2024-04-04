import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError } from 'rxjs';
import { Availability } from '../model/availability.model';

@Injectable({
  providedIn: 'root'
})

export class AvailabilityService {
  private baseUrl = "http://localhost:8401/beautyApp/api"; 

  constructor(private httpClient: HttpClient) {}

  // getAllAvailabilitys(): Observable<Availability[]> {
  //   return this.httpClient.get<Availability[]>(`${this.baseUrl}/availability`);
  // }

  getAvailabilities(serviceId: number): Observable<Availability[]> {
    return this.httpClient.get<Availability[]>(`${this.baseUrl}/serviceProfile/${serviceId}/availability`);
  }
  bookAppointment(appointmentData: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseUrl}/appointment`, appointmentData);
}}