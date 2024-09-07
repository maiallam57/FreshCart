import { Component, inject, OnInit } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Cart } from '../../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit {
  isLoading: boolean = true;
  cart!: Cart;

  private readonly _cartService = inject(CartService);


  ngOnInit(): void {
    this._cartService.getUserCart().subscribe({
      next: (res) => {
        this.isLoading = false;
        console.log(res);
        this.cart = res;
      },
      error: (err) => {
        this.isLoading = true;
        console.log(err);
      }
    });
  }

}
