import { Component, inject, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Category } from '../../../../../core/interfaces/product';
import { CategoryService } from '../../../../../core/services/category.service';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit {
  private readonly _categoryservice = inject(CategoryService);
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    margin: 10,
    navText: ['', ''],
    responsive: {
      0: {
        items: 2
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: true
  }

  categoryList: Category[] = [];

  ngOnInit(): void {
    this.getCategories();
  }

  getCategories(): void {
    this._categoryservice.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
        console.log(this.categoryList);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}


