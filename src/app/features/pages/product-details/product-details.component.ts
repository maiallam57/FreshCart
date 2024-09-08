import { Component, ElementRef, inject, Input, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryLabelDirective } from '../../directives/category-label.directive';
import { CartService } from '../../../core/services/cart.service';
import { WishlistService } from '../../../core/services/wishlist.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CarouselModule, CategoryLabelDirective],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productDetails: Product | null = null;
  getSpecificProductSub!: Subscription;
  addProductToCartSub!: Subscription;
  addProductTowishlistSub!: Subscription;
  delProductTowishlistSub!: Subscription;

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);
  private readonly _productService = inject(ProductService);
  private readonly _activatedRoute = inject(ActivatedRoute);
  private readonly _cartService = inject(CartService);
  private readonly _wishlistService = inject(WishlistService);

  customOptionsDetails: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe({
      next: (param) => {
        let productId = param.get('productId');
        this.getSpecificProduct(productId);
      }
    });
  }

  ngOnDestroy(): void {
    this.getSpecificProductSub?.unsubscribe();
    this.addProductToCartSub?.unsubscribe();
    this.addProductTowishlistSub?.unsubscribe();
    this.delProductTowishlistSub?.unsubscribe();
  }


  getSpecificProduct(productId: string | null): void {
    this.getSpecificProductSub = this._productService.getSpecificProducts(productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
      },
      error: (err) => {
        console.log(err);
      }
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


  addToWishlist(productId: string): void {
    let element = this._elementRef.nativeElement
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

}
