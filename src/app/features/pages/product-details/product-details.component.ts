import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryLabelDirective } from '../../directives/category-label.directive';

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

  private readonly _productService = inject(ProductService);
  private readonly _activatedRoute = inject(ActivatedRoute);

  customOptions: OwlOptions = {
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
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
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
  }


  getSpecificProduct(productId: string | null): void {
    this.getSpecificProductSub = this._productService.getSpecificProducts(productId).subscribe({
      next: (res) => {
        this.productDetails = res.data;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
