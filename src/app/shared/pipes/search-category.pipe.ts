import { Category } from './../../core/interfaces/category';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchCategory',
  standalone: true
})
export class SearchCategoryPipe implements PipeTransform {

  transform(arrOfObject: any[], catValue: string): any[] {
    return arrOfObject.filter((item) => item.Category.toLowerCase().includes(catValue.toLowerCase()));
  }


}
