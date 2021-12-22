
import {createSelector} from '@ngrx/store';
import {getUserState, getUserDetail} from '../reducers';

export const getUserDetailState = createSelector(getUserState, getUserDetail);
