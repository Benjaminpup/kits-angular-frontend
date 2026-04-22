// src/app/applicationadmin/sort.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';


@Pipe({
  name: 'sort'
})
export class CroSortPipe implements PipeTransform {
  transform(array: any[], field: string, direction: number): any[] {
    if (!array || !field || !direction) {
      return array;
    }

    const factor = direction === 1 ? 1 : -1;

    return array.slice().sort((a, b) => {
      if (a[field] < b[field]) {
        return -factor;
      } else if (a[field] > b[field]) {
        return factor;
      } else {
        return 0;
      }
    });
  }
}
