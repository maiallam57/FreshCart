import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import { Wishlist } from '../../../core/interfaces/wishlist';
import { CartService } from '../../../core/services/cart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {

  addWishlistSub!: Subscription;
  addProductToCartSub!: Subscription;
  delWishlistSub!: Subscription;
  favProducts!: Wishlist;

  private readonly _wishlistService = inject(WishlistService);
  private readonly _cartService = inject(CartService);

  ngOnInit(): void {
    this.addWishlistSub = this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        this.favProducts = res;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.addWishlistSub?.unsubscribe();
    this.delWishlistSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
  }

  removeItem(id: string): void {
    this.delWishlistSub = this._wishlistService.DelFromWishlist(id).subscribe({
      next: (res) => {
        this.favProducts = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addToCart(id: string) {
    this.addProductToCartSub = this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

}
