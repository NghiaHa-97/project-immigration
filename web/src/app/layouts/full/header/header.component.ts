import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import * as fromStore from '../../../store';
import {getUserDetailState} from '../../../store';
import {Observable} from 'rxjs';
import {tap} from 'rxjs/operators';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppHeaderComponent implements OnInit {
  userDetail$!: Observable<any>;
  private isLogout = false;

  constructor(private store: Store<fromStore.RootState>) {
  }

  ngOnInit(): void {
    this.userDetail$ = this.store.select(getUserDetailState).pipe(
      tap(val => {
        if (!this.isLogout && !val?.principal) {
          this.store.dispatch(new fromStore.LoadUser());
        }
      })
    );
  }

  logout(): void {
    this.isLogout = true;
    this.store.dispatch(new fromStore.Logout());
  }
}
