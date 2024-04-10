// review-page.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { FormGroup } from '@angular/forms';
import { ReviewService } from '../../services/review.service'; // Import the service
import { Review } from '../../model/review.model';

@Component({
  selector: 'app-review-page',
  templateUrl: './review-page.component.html',
  styleUrls: ['./review-page.component.css'],
})
export class ReviewPageComponent implements OnInit {
  public reviewForm!: FormGroup;
  serviceId: number | null = null; 

  reviews: Review[] = [];

  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private reviewService: ReviewService // Inject the service
    
  ) {}

  ngOnInit(): void {
    // Extract service ID from route parameters
    this.route.paramMap.subscribe(params => {
      const serviceIdString = params.get('serviceId');
      if (serviceIdString) {
        this.serviceId = parseInt(serviceIdString, 10); // Convert string to number
        // Fetch review details based on service ID
        this.getReviewDetails();
      } else {
        // Handle the case when 'serviceId' is null
        console.error('Service ID is null');
      }
    });
  }
  
  getReviewDetails(): void {
    this.loading = true;
    if (this.serviceId) {
      this.reviewService.getReviews(this.serviceId).subscribe(
        (data: Review[]) => {
          this.reviews = data;
          console.log('Review Details:', this.reviews);
          this.loading = false;
        },
        (error: any) => {
          console.error('Error fetching review:', error);
          this.loading = false;
        }
      );
    }
  }

  returnToDashBoard():void{
    this.router.navigate([""]);
  }
  
  routeTo(serviceName: string) {
    this.router.navigate(['service', serviceName]);
  }

  logout(): void {
    this.authenticationService.logout();
  }
}
