import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromDistrictAction from '../../actions/district.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface DistrictState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: DistrictState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromDistrictAction.ActionDistrict
): DistrictState {
  switch (action.type) {
    case fromDistrictAction.LOAD_DISTRICT_BY_CITY_PROVINCE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload?.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: item,
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

    case fromDistrictAction.LOAD_DISTRICT_BY_CITY_PROVINCE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getDistrictEntities = (state: DistrictState) => state.entities;
export const getDistrictResponseStatus = (state: DistrictState) => state.responseStatus;


