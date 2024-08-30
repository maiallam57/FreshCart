import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly _productService = inject(ProductService);
  productList: Product[] = [];

  constructor() {

  }

  ngOnInit(): void {
    this._productService.getAllProducts().subscribe({
      next: (res) => {
        this.productList = res.data;
        console.log(this.productList);
      },
      error: (err) => {
        console.log(err);
      },
    });

  }
}
