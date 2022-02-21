import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromCommentAction from '../../actions/comment.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface CommentState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: CommentState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromCommentAction.ActionComment
): CommentState {
  switch (action.type) {
    case fromCommentAction.LOAD_COMMENT_BY_PROFILE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: {...item},
          };
        },
        {}
      );

      return {
        ...state,
        entities,
        responseStatus
      };
    }

    case fromCommentAction.LOAD_DETAIL_COMMENT_SUCCESS:
    case fromCommentAction.CREATE_COMMENT_SUCCESS:
    case fromCommentAction.LOAD_COMMENT_BY_PROFILE_EMPLOYEE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entity = action.payload?.data;
      const entities = {
        ...state.entities,
        [getPrefixID(entity.id)]: {...entity},
      };

      return {
        ...state,
        entities,
        responseStatus
      };
    }
    case fromCommentAction.CREATE_COMMENT_FAIL:
    case fromCommentAction.LOAD_DETAIL_COMMENT_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getCommentEntities = (state: CommentState) => state.entities;
export const getCommentResponseStatus = (state: CommentState) => state.responseStatus;


