import { Component, inject } from '@angular/core';
import { Category } from '../../../core/interfaces/category';
import { CategorySliderComponent } from '../home/components/category-slider/category-slider.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CategorySliderComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  CategoryList: Category[] = [];


  ngOnInit(): void {
  }

}
