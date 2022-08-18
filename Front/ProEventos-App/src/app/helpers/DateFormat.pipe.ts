import { DatePipe } from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { Constants } from '@app/util/constants';

@Pipe({
  name: 'DateFormat',
})
export class DateFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var datePipe = new DatePipe('en');

    if (
      !(value instanceof Date) &&
      value !== undefined &&
      value !== null &&
      value.split('/').length == 3
    ) {
      const [day, month, year] = value.split('/');
      const date = new Date(+year, month - 1, +day);
      value = date;
    }
    value = !args ? datePipe.transform(value, `${Constants.DATE_FMT}`) : value;
    return value;
  }
}
