import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pricing } from '../model/pricing.model';

@Injectable({
  providedIn: 'root'
})

export class PricingService {
  private baseUrl = "http://localhost:8401/beautyApp/api"; 

  constructor(private httpClient: HttpClient) {}

  // getAllPricings(): Observable<Pricing[]> {
  //   return this.httpClient.get<Pricing[]>(`${this.baseUrl}/pricing`);
  // }

  getPricings(serviceId: number): Observable<Pricing[]> {
    return this.httpClient.get<Pricing[]>(`${this.baseUrl}/serviceProfile/${serviceId}/pricing`);
  }

}