import {createSelector} from '@ngrx/store';
import {getRouterState} from '../reducers';
import {
  getRouterParams,
  getRouterQueryParams,
  getRouterUrl
} from '../reducers/root/router.reducer';

export const getRouterUrlState = createSelector(getRouterState, getRouterUrl);
export const getRouterQueryParamsState = createSelector(getRouterState, getRouterQueryParams);
export const getRouterParamsState = createSelector(getRouterState, getRouterParams);
