import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../../core/services/product.service';
import { Product } from '../../../core/interfaces/product';
import { ProductItemComponent } from "../../../shared/components/ui/product-item/product-item.component";
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MainSliderComponent } from "./components/main-slider/main-slider.component";
import { Subscription } from 'rxjs';
import { CategorySliderComponent } from "./components/category-slider/category-slider.component";
import { SearchInputComponent } from "../../../shared/components/search-input/search-input.component";
import { SearchPipe } from '../../../shared/pipes/search.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductItemComponent, CarouselModule, MainSliderComponent, CategorySliderComponent, SearchInputComponent, SearchPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly _productService = inject(ProductService);
  productList: Product[] = [];
  getAllProductsSub!: Subscription;
  receivedValue: string = "";

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
        console.log(this.productList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  receiveInputValue(value: string) {
    this.receivedValue = value;
  }
}
