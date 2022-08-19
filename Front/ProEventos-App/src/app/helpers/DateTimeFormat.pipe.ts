import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { Constants } from '../util/constants';

@Pipe({
  name: 'DateTimeFormat',
})
export class DateTimeFormatPipe implements PipeTransform {
  transform(value: any, args?: any): any {
    var datePipe = new DatePipe('en');

    if (
      !(value instanceof Date) &&
      value !== undefined &&
      value !== null &&
      value.split('/').length == 3
    ) {
      const [date, time] = value.split(' ');
      const [hours, minutes, seconds] = time.split(':');
      const datetime = args
      ? new Date(
          +date.split('/')[2],
          date.split('/')[1] - 1,
          +date.split('/')[0],
          +hours,
          +minutes,
          +seconds
        )
      : new Date(
          +date.split('/')[2],
          date.split('/')[0] - 1,
          +date.split('/')[1],
          +hours,
          +minutes,
          +seconds
        );

      value = datetime;
    }
    value = !args ? datePipe.transform(value, `${Constants.DATE_TIME_FMT}`) : value;
    return value;
  }
}
