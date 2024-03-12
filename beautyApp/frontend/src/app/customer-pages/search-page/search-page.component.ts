// import { Component } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styleUrl: './search-page.component.css'
})
export class SearchPageComponent implements OnInit {

  service: string | undefined;
  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
     this.route.params.subscribe(params => { this.service = params['service']; });
  }

 


}
