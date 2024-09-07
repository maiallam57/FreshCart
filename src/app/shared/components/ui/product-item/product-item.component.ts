import { Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
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
  @Output() sendId: EventEmitter<string> = new EventEmitter()


  private readonly _router = inject(Router);

  getDetails() {
    this._router.navigate(['/productDetails', this.product.id]);
  }


  addToCart(productId: string): void {
    console.log(productId);
    this.sendId.emit(`${productId}`);
    console.log("productId:", productId);
  } 
}
