import { Component, inject } from '@angular/core';
import { Category } from '../../../core/interfaces/category';
import { CategorySliderComponent } from '../home/components/category-slider/category-slider.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductSliderComponent } from "./components/product-slider/product-slider.component";

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategorySliderComponent, CarouselModule, ProductSliderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  //pipe
  ngOnInit(): void {
  }

}
