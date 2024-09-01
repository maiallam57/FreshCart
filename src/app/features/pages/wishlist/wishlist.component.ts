import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { WishlistService } from '../../../core/services/wishlist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent implements OnInit, OnDestroy {

  wishlistSub!: Subscription;

  private readonly _wishlistService = inject(WishlistService);

  ngOnInit(): void {
    this.wishlistSub = this._wishlistService.getWishlist().subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  ngOnDestroy(): void {
    this.wishlistSub?.unsubscribe();
  }

}
