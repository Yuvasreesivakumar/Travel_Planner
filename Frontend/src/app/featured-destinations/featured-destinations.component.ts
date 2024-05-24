import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Destination } from '../destinationmodule';
import { DestinationServiceService } from '../destination-service.service';
import { CartService } from '../cart.service';
import { LikesService } from '../like.service';

@Component({
  selector: 'app-featured-destinations',
  templateUrl: './featured-destinations.component.html',
  styleUrls: ['./featured-destinations.component.css']
})
export class FeaturedDestinationsComponent implements OnInit {

  destinations: Destination[] = [];
  displayedDestinations: Destination[] = [];

  constructor(
    private destinationService: DestinationServiceService,
    private cartService: CartService,
    private LikesService: LikesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getFeaturedDestinations();
  }

  addToCart(destination: Destination) {
    this.cartService.addToCart(destination).subscribe(response => {
      console.log('Added to cart:', response);
    }, error => {
      console.error('Error adding to cart:', error);
    });
  }

  exploreDestination(destinationId: number) {
    this.router.navigate(['/destination', destinationId]);
  }

  getFeaturedDestinations(): void {
    this.destinationService.getFeaturedDestinations()
      .subscribe(destinations => {
        this.destinations = destinations;
        this.displayedDestinations = destinations;
      });
  }

  filterDestinations(searchQuery: string): void {
    if (searchQuery) {
      this.displayedDestinations = this.destinations.filter(destination =>
        destination.name.toLowerCase().includes(searchQuery.toLowerCase()));
    } else {
      this.displayedDestinations = this.destinations;
    }
  }

  likeDestination(destination: Destination) {
    this.LikesService.addToLikes(destination).subscribe(() => {
      this.router.navigate(['/likes']);
    });
  }
}
