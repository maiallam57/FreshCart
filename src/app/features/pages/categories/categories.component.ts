import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Category } from '../../../core/interfaces/category';
import { CategorySliderComponent } from '../home/components/category-slider/category-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductSliderComponent } from "./components/product-slider/product-slider.component";
import { CardItemComponent } from "../../../shared/components/ui/card-item/card-item.component";
import { Subscription } from 'rxjs';
import { CategoryService } from '../../../core/services/category.service';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategorySliderComponent, CarouselModule, CardItemComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit, OnDestroy {
  //pipe
  categoryList: Category[] = [];
  getAllCategorySub!: Subscription;
  private readonly _categoryservice = inject(CategoryService);

  ngOnInit(): void {
    this.getCategory();
  }

  ngOnDestroy(): void {
    this.getAllCategorySub?.unsubscribe();
  }

  getCategory(): void {
    this.getAllCategorySub = this._categoryservice.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
