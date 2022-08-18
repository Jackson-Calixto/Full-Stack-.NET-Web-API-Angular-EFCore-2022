import { DatePipe } from '@angular/common';
import { LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { EventoListaComponent } from '@app/components/eventos/evento-lista/evento-lista.component';
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
      const [date, time] = value.split(' ');
      const datetime = args
        ? new Date(
            +date.split('/')[2],
            date.split('/')[1] - 1,
            +date.split('/')[0]
          )
        : new Date(
            +date.split('/')[2],
            date.split('/')[0] - 1,
            +date.split('/')[1]
          );
      value = datetime;
    }
    value = !args ? datePipe.transform(value, `${Constants.DATE_FMT}`) : value;
    return value;
  }
}
