import { Component, OnInit, ViewChild } from '@angular/core';
import { FeaturedDestinationsComponent } from '../featured-destinations/featured-destinations.component';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  @ViewChild(FeaturedDestinationsComponent) featuredDestinations!: FeaturedDestinationsComponent;

  ngOnInit(): void {
    console.log('Homepage component initialized');
  }

  search(searchQuery: string) {
    this.featuredDestinations.filterDestinations(searchQuery);
  }
}

