import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { CategoryService } from '../../../../../core/services/category.service';
import { Category } from '../../../../../core/interfaces/category';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-category-slider',
  standalone: true,
  imports: [CarouselModule],
  templateUrl: './category-slider.component.html',
  styleUrl: './category-slider.component.scss'
})
export class CategorySliderComponent implements OnInit, OnDestroy {

  private readonly _categoryservice = inject(CategoryService);
  categoryList: Category[] = [];
  getAllCategories!: Subscription;

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
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

  ngOnInit(): void {
    this.getAllCategories = this._categoryservice.getAllCategories().subscribe({
      next: (res) => {
        this.categoryList = res.data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }


  ngOnDestroy(): void {
    this.getAllCategories?.unsubscribe();
  }
}


