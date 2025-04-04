import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'objectValues'
})
export class ObjectValuesPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value ? Object.values(value) : [];
  }

}
