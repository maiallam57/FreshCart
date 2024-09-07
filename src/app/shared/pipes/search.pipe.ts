import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(arrOfObject: any[], searchValue: string): any[] {
    return arrOfObject.filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()));
  }

}
