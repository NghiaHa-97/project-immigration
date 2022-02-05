import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromCityProvinceAction from '../../actions/city-province.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface CityProvinceState {
  entities: { [id: string]: any };
  responseStatus: ResponseStatusModel;
}

export const initialState: CityProvinceState = {
  entities: {},
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromCityProvinceAction.ActionCityProvince
): CityProvinceState {
  switch (action.type) {
    case fromCityProvinceAction.LOAD_CITY_PROVINCE_SUCCESS: {
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

    case fromCityProvinceAction.LOAD_CITY_PROVINCE_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        responseStatus
      };
    }
  }

  return state;
}

export const getCityProvinceEntities = (state: CityProvinceState) => state.entities;
export const getCityProvinceResponseStatus = (state: CityProvinceState) => state.responseStatus;


