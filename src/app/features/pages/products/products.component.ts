import { Component, ElementRef, inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { Product } from '../../../core/interfaces/product';
import { ProductService } from '../../../core/services/product.service';
import { Subscription } from 'rxjs';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { SearchPipe } from '../../../shared/pipes/search.pipe';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ProductItemComponent, SearchInputComponent, SearchPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent implements OnInit, OnDestroy {
  productList: Product[] = [];
  bestSeller: Product[] = [];
  getAllProductsSub!: Subscription;
  addProductToCartSub!: Subscription;
  addProductTowishlistSub!: Subscription;
  delProductTowishlistSub!: Subscription;
  receivedValue: string = "";

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);
  private readonly _productService = inject(ProductService);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);

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
        this.getBestSellerProducts();
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


  getBestSellerProducts(): void {
    for (let index = 0; index < this.productList.length; index++) {
      if (this.productList[index].sold > 3000) {
        this.bestSeller?.push(this.productList[index]);
      }
    }
    console.log(this.bestSeller);
  }

  receiveInputValue(value: string) {
    this.receivedValue = value;
  }
}
