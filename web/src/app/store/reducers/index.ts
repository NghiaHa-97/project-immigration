import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import * as fromAuthReducer from './auth.reducer';

// export const reducers: any[] = [routerReducer];

export * from './router.reducer';

export interface UserState {
  userLogin: fromAuthReducer.AuthState;
}

export const reducers: ActionReducerMap<UserState, any> = {
  userLogin: fromAuthReducer.reducer
};

export const getProductState = createFeatureSelector<UserState>(
  'user'
);

