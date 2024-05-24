import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  totalExpense: number = 0;

  constructor(private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotalExpense();
    });
  }
  navigateToDetails(itemId: number): void {
    this.router.navigate(['/destination', itemId]);
  }

  calculateTotalExpense(): void {
    this.totalExpense = this.cartItems.reduce((total, item) => total + item.expense, 0);
  }

}
