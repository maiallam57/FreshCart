import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CartService } from '../../../core/services/cart.service';
import { Cart } from '../../../core/interfaces/cart';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoryLabelDirective } from '../../directives/category-label.directive';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, CategoryLabelDirective],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  cart!: Cart;

  getUserCartSub!: Subscription;
  updateUserCartSub!: Subscription;
  removeCartItemSub!: Subscription;

  private readonly _cartService = inject(CartService);

  ngOnInit(): void {
    this.getUserCartSub = this._cartService.getUserCart().subscribe({
      next: (res) => {
        this.isLoading = true;
        this.cart = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.isLoading = false;
  }

  updateCount(id: string, count: number): void {
    this.updateUserCartSub = this._cartService.updateProductQuantity(id, count).subscribe({
      next: (res) => {
        this.isLoading = true;
        this.cart = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.isLoading = false;
  }

  removeCartItem(id: string): void {
    this.removeCartItemSub = this._cartService.removeCartItem(id).subscribe({
      next: (res) => {
        this.isLoading = true;
        this.cart = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.isLoading = false;


  }
  ngOnDestroy(): void {
    this.getUserCartSub?.unsubscribe();
    this.updateUserCartSub?.unsubscribe();
    this.removeCartItemSub?.unsubscribe();
  }

}
