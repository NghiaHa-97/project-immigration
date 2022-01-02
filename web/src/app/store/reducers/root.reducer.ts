import * as fromRouter from '@ngrx/router-store';
import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {RouterStateUrl} from './root/router.reducer';
import * as fromAuthReducer from './root/auth.reducer';

import * as fromProcessReducer from './root/process.reducer';


export interface RootState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
  user: fromAuthReducer.AuthState;
  process: fromProcessReducer.ProcessState;

}

export const rootReducer: ActionReducerMap<RootState, any> = {
  router: fromRouter.routerReducer,
  user: fromAuthReducer.reducer,
  process: fromProcessReducer.reducer
};


export const getRouterState = createFeatureSelector<fromRouter.RouterReducerState<RouterStateUrl>>(
  'router');
export const getUserState = createFeatureSelector<fromAuthReducer.AuthState>(
  'user');
export const getProductStore = createFeatureSelector<fromProcessReducer.ProcessState>(
  'process');
