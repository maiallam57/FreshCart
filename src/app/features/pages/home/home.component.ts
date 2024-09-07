import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { Subscription } from 'rxjs';
import { CategorySliderComponent } from "./components/category-slider/category-slider.component";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent, CarouselModule, MainSliderComponent, CategorySliderComponent, SearchInputComponent, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);

  productList: Product[] = [];
  getAllProductsSub!: Subscription;
  addProductToCartSub!: Subscription;
  addWishlistSub!: Subscription;
  receivedValue: string = "";

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.addWishlistSub?.unsubscribe();
  }

  getProducts(): void {
    this.getAllProductsSub = this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addToCart(id: string) {
    this.addProductToCartSub = this._cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  addItemToWishlist(id: string): void {
    this.addWishlistSub = this._wishlistService.DelFromWishlist(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
  receiveInputValue(value: string) {
    this.receivedValue = value;
  }
}
