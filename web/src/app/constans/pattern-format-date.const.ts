import {Injectable} from '@angular/core';
import * as moment from 'moment';

export const PATTERN_FORMAT_DATE = {
  DATETIME_REQUEST: 'yyyy-MM-DD HH:mm:ss',
  DATE_REQUEST: 'yyyy-MM-DD',
  DATETIME_RESPONSE: 'DD/MM/YYYY, h:mm:ss a',
  DATE_RESPONSE: 'DD/MM/YYYY',
  TIME_SECONDS: 'HH:mm:ss',
  TIME: 'HH:mm'
};

@Injectable()
export class PatternFormat {
  constructor() {
  }

  combineDateAndTimeToDateTimeRequest(date: any, time: string): string {
    return moment(date).format(PATTERN_FORMAT_DATE.DATE_REQUEST)
      + ' '
      + moment(time, PATTERN_FORMAT_DATE.TIME).format(PATTERN_FORMAT_DATE.TIME_SECONDS);
  }

  splitDateTimeResponseToDateAndTime(datetimeResponse: any): { date: string, time: string } {
    return {
      date: moment(datetimeResponse).format(PATTERN_FORMAT_DATE.DATE_RESPONSE),
      time: moment(datetimeResponse).format(PATTERN_FORMAT_DATE.TIME)
    };
  }

  formatDatetimeToString(datetime: any): string | null {
    return datetime ? moment(datetime).format(PATTERN_FORMAT_DATE.DATETIME_RESPONSE) : null;
  }
}
