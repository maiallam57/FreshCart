import { Component, inject, Input, OnInit } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';
import { Router } from '@angular/router';
import { ProductService } from '../../../../core/services/product.service';
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

  private readonly _router = inject(Router);

  getDetails() {
    this._router.navigate(['/productDetails', this.product.id]);
  }

}
