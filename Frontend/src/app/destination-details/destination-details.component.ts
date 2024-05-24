import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { DestinationServiceService } from '../destination-service.service';
import { Destination } from '../destinationmodule';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { LikesService } from '../like.service';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.css']
})
export class DestinationDetailsComponent implements OnInit {
  destination: Destination | undefined;
  currentSlideIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private destinationService: DestinationServiceService,
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router,
    private cartService: CartService,
    private likesService: LikesService
  ) {}

  ngOnInit(): void {
    const destinationId = parseInt(this.route.snapshot.paramMap.get('id') || '0', 10);
    this.destinationService.getDestinationById(destinationId).subscribe(destination => {
      this.destination = destination;
      if (isPlatformBrowser(this.platformId)) {
        this.showSlides();
      }
    });
  }

  plusSlides(n: number) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentSlideIndex += n;
      const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
      if (this.currentSlideIndex >= slides.length) { this.currentSlideIndex = 0; }
      if (this.currentSlideIndex < 0) { this.currentSlideIndex = slides.length - 1; }
      this.showSlides();
    }
  }

  showSlides() {
    if (isPlatformBrowser(this.platformId)) {
      const slides = document.getElementsByClassName("mySlides") as HTMLCollectionOf<HTMLElement>;
      for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
      }
      if (slides[this.currentSlideIndex]) {
        slides[this.currentSlideIndex].style.display = "block";
      }
    }
  }

  addToCart(destination: Destination) {
    this.cartService.addToCart(destination).subscribe(() => {
      this.router.navigate(['/cart']);
    });
  }

  likeDestination(destination: Destination) {
    this.likesService.addToLikes(destination).subscribe(() => {
      this.router.navigate(['/likes']);
    });
  }
}
