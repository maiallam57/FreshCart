import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { Product } from '../../../core/interfaces/product';
import { ProductService } from '../../../core/services/product.service';
import { Subscription } from 'rxjs';
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { SearchPipe } from '../../../shared/pipes/search.pipe';

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
  receivedValue: string = "";

  private readonly _productService = inject(ProductService);

  ngOnInit(): void {
    this.getProducts();
  }

  ngOnDestroy(): void {
    this.getAllProductsSub?.unsubscribe();

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
