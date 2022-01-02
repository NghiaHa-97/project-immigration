
import {createSelector} from '@ngrx/store';
import {getUserState} from '../reducers';
import {getUserDetail} from '../reducers/root/auth.reducer';

export const getUserDetailState = createSelector(getUserState, getUserDetail);
