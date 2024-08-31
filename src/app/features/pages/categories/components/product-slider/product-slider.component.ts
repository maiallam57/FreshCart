import { Component, inject, Input } from '@angular/core';
import { ProductService } from '../../../../../core/services/product.service';
import { Product } from '../../../../../core/interfaces/product';
import { Subscription } from 'rxjs';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductItemComponent } from "../../../../../shared/components/ui/product-item/product-item.component";

@Component({
  selector: 'app-product-slider',
  standalone: true,
  imports: [CarouselModule, ProductItemComponent],
  templateUrl: './product-slider.component.html',
  styleUrl: './product-slider.component.scss'
})
export class ProductSliderComponent {
  @Input() CategoryName!: string;
  @Input() productList!: Product[];

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }
}
