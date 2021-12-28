import {Injectable} from "@angular/core";
import {MatPaginatorIntl} from '@angular/material/paginator';
import {Subject} from 'rxjs';



@Injectable()
export class CustomPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Trang đầu`;
  itemsPerPageLabel = $localize`Số dòng trong trang:`;
  lastPageLabel = $localize`Trang cuối`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Trang sau';
  previousPageLabel = 'Trang trước';

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Trang 1 của 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Trang ${page + 1} của ${amountPages}`;
  }
}
