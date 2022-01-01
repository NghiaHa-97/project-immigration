import {NativeDateAdapter} from '@angular/material/core';
import {Injectable} from '@angular/core';

//https://www.concretepage.com/angular-material/angular-material-datepicker-format

// @Injectable()
// export class CustomDateAdapter extends NativeDateAdapter {
//
//   format(date: Date, displayFormat: Object): string {
//     let result = date.toDateString();
//     const day = date.getDate();
//     const month = date.getMonth() + 1;
//     const year = date.getFullYear();
//     // see that displayformat get all the values indicate in MY_FORMATS.display
//     console.log('date', date);
//     console.log('result', result);
//     switch (displayFormat) {
//       case 'DD/MM/YYYY':
//         // Return the format as per your requirement
//         result = `${day}-${month}-${year}`;
//         break;
//       default:
//       case 'MMM YYYY':
//         // Return the format as per your requirement
//         result = `${month}-${year}`;
//         break;
//     }
//     return result;
//   }
//
//   parse(value: any): Date | null {
//     return super.parse(value);
//   }
// }
//
export const MY_FORMATS = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'DD/MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


/** Adapts the native JS Date for use with cdk-based components that work with dates. */
@Injectable()
export class CustomDateAdapter extends NativeDateAdapter {

  parse(value: any): Date | null {

    if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
      const str = value.split('/');

      const year = Number(str[2]);
      const month = Number(str[1]) - 1;
      const date = Number(str[0]);
      console.log(month);
      if (month < 0 || month > 11 || date > 31 || date < 1) {
        console.log("parse", null);
        return null
      }
      return new Date(year, month, date);
    }
    const timestamp = typeof value === 'number' ? value : Date.parse(value);
    return isNaN(timestamp) ? null : new Date(timestamp);
  }

  // retirar quando for feito o merge da data por mmalerba
  format(date: Date, displayFormat: Object): string {

    date = new Date(Date.UTC(
      date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(),
      date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
    displayFormat = Object.assign({}, displayFormat, {timeZone: 'utc'});


    const dtf = new Intl.DateTimeFormat(this.locale, displayFormat);
    return dtf.format(date).replace(/[\u200e\u200f]/g, '');
  }

}

//
// parse(value: any): Date | null {
//   if ((typeof value === 'string') && (value.indexOf('/') > -1)) {
//     const str = value.split('/');
//     if (str.length < 2 || isNaN(+str[0]) || isNaN(+str[1]) || isNaN(+str[2])) {
//       return null;
//     }
//     return new Date(Number(str[2]), Number(str[1]) - 1, Number(str[0]), 12);
//   }
//   const timestamp = typeof value === 'number' ? value : Date.parse(value);
//   return isNaN(timestamp) ? null : new Date(timestamp);
// }

