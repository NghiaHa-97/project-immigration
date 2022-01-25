import {createSelector} from '@ngrx/store';
import {getProductStore} from '../reducers';
import {getProcess} from '../reducers/root/process.reducer';

export const getProcessValueState = createSelector(getProductStore, getProcess);
