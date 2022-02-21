import {createSelector} from '@ngrx/store';
import {getFeaturesState, getComment} from '../reducers';
import {getCommentEntities, getCommentResponseStatus} from '../reducers/feature/comment.reducer';

export const getCommentState = createSelector(getFeaturesState, getComment);
export const getCommentEntitiesState = createSelector(getCommentState, getCommentEntities);
export const getArrayCommentState = createSelector(getCommentEntitiesState, (entities) => {
  if (!entities) {
    return [];
  }
  return Object.keys(entities).map(id => entities[id]);
});

export const getCommentResponseStatusState = createSelector(getCommentState, getCommentResponseStatus);
