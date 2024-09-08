import { Component, ElementRef, EventEmitter, inject, Input, OnInit, Output, Renderer2 } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { Router } from '@angular/router';
import { CategoryLabelDirective } from '../../../../features/directives/category-label.directive';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [CategoryLabelDirective],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product!: Product;
  @Output() sendId: EventEmitter<string> = new EventEmitter();
  @Output() sendIdWishlist: EventEmitter<string> = new EventEmitter();

  isLoading: boolean = false;

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);
  private readonly _router = inject(Router);

  getDetails() {
    this._router.navigate(['/productDetails', this.product.id]);
  }


  addToCart(productId: string): void {
    this.isLoading = true;
    this.sendId.emit(`${productId}`);
    setTimeout(() => {
      this.isLoading = false;
    }, 1500)
  }

  addToWishlist(productId: string): void {
    this.sendIdWishlist.emit(`${productId}`);
    let element = this._elementRef.nativeElement
    if (element.classList.contains('text-red-500')) {
      this._renderer2.removeClass(element, 'text-red-500');
    } else {
      this._renderer2.addClass(element, 'text-red-500');
    }
  }
}
