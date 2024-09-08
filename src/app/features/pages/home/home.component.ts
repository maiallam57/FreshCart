import { Component, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
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

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);

  productList: Product[] = [];
  getAllProductsSub!: Subscription;
  addProductToCartSub!: Subscription;
  addProductTowishlistSub!: Subscription;
  delProductTowishlistSub!: Subscription;
  receivedValue: string = "";

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.addProductTowishlistSub?.unsubscribe();
    this.delProductTowishlistSub?.unsubscribe();
  }

  getProducts(): void {
    this.getAllProductsSub = this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(this.productList)
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

  addItemToWishlist(productId: string): void {
    let element = this._elementRef.nativeElement;
    if (element.classList.contains('text-red-500')) {
      this.delProductTowishlistSub = this._wishlistService.DelFromWishlist(productId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
      this._renderer2.removeClass(element, 'text-red-500');
    } else {
      this._renderer2.addClass(element, 'text-red-500');
      this.addProductTowishlistSub = this._wishlistService.AddToWishlist(productId).subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }

  receiveInputValue(value: string) {
    this.receivedValue = value;
  }
}
