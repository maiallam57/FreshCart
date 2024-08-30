import { Component, Input } from '@angular/core';
import { Product } from '../../../../core/interfaces/product';

@Component({
  selector: 'app-product-item',
  standalone: true,
  imports: [],
  templateUrl: './product-item.component.html',
  styleUrl: './product-item.component.scss'
})
export class ProductItemComponent {

  @Input() product!: Product;

}
