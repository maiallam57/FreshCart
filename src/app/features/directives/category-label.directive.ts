import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCategoryLabel]',
  standalone: true
})
export class CategoryLabelDirective implements OnInit {

  @Input() categoryName!: string;

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

  private applyStyles(color: string): void {
    const classList = [
      'mb-3',
      'w-fit',
      'text-xs',
      'font-medium',
      'me-2',
      'px-2.5',
      'py-0.5',
      'rounded',
      `bg-${color}-300`,
      `text-${color}-800`
    ];
    classList.forEach(className => {
      this._renderer2.addClass(this._elementRef.nativeElement, className);
    });
  }

  private pickColor(): void {
    if (this.categoryName == 'Music') {
      this.applyStyles('green');
    } else if (this.categoryName == "Men's Fashion") {
      this.applyStyles('blue');
    } else if (this.categoryName == "Women's Fashion") {
      this.applyStyles('red');
    } else if (this.categoryName == "SuperMarket") {
      this.applyStyles('orange');
    } else if (this.categoryName == "Baby & Toys") {
      this.applyStyles('yellow');
    } else if (this.categoryName == "Home") {
      this.applyStyles('purple');
    } else if (this.categoryName == "Books") {
      this.applyStyles('gray');
    } else if (this.categoryName == "Beauty & Health") {
      this.applyStyles('pink');
    } else if (this.categoryName == "Mobiles") {
      this.applyStyles('teal');
    } else if (this.categoryName == "Electronics") {
      this.applyStyles('gray');
    }
  }

  ngOnInit(): void {
    this.pickColor();
  }
}
