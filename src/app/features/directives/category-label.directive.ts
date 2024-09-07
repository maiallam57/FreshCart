import { Directive, ElementRef, inject, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appCategoryLabel]',
  standalone: true
})
export class CategoryLabelDirective implements OnInit {

  @Input() categoryName!: string;

  private readonly _elementRef = inject(ElementRef);
  private readonly _renderer2 = inject(Renderer2);

  private pickColor(): void {
    if (this.categoryName == 'Music') {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-green-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-green-500');
    } else if (this.categoryName == "Men's Fashion") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-blue-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-blue-500');
    } else if (this.categoryName == "Women's Fashion") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-red-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-red-500');
    } else if (this.categoryName == "SuperMarket") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-orange-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-orange-500');
    } else if (this.categoryName == "Baby & Toys") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-yellow-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-yellow-500');
    } else if (this.categoryName == "Home") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-purple-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-purple-500');
    } else if (this.categoryName == "Books") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-gray-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-gray-500');
    } else if (this.categoryName == "Beauty & Health") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-pink-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-pink-500');
    } else if (this.categoryName == "Mobiles") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-teal-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-teal-500');
    } else if (this.categoryName == "Electronics") {
      this._renderer2.addClass(this._elementRef.nativeElement, 'bg-gray-100');
      this._renderer2.addClass(this._elementRef.nativeElement, 'text-gray-500');
    }
  }

  ngOnInit(): void {
    this.pickColor();
  }
}
