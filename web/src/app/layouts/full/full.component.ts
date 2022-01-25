import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, AfterViewInit, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {MenuItems} from '../../shared/menu-items/menu-items';
import {Observable} from 'rxjs';
import * as fromStore from '../../store'
import {Store} from '@ngrx/store';
import {getProcessValueState} from '../../store/selectors/process.selector';
import {delay} from 'rxjs/operators';


/** @title Responsive sidenav */
@Component({
  selector: 'app-full-layout',
  templateUrl: 'full.component.html',
  styleUrls: ['./full.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FullComponent implements OnDestroy, AfterViewInit, OnInit {
  process$!: Observable<boolean>;
  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef,
              media: MediaMatcher,
              public menuItems: MenuItems,
              private store: Store<fromStore.RootState>
  ) {
    this.mobileQuery = media.matchMedia('(min-width: 768px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this.process$ = this.store.select(fromStore.getProcessValueState).pipe(delay(0))
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngAfterViewInit() {

  }


}
