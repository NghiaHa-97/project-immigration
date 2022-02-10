import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromCountryAction from '../../actions/country.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface CountryState {
  entities: { [id: string]: any };
  isLoaded: boolean;
  responseStatus: ResponseStatusModel;
}

export const initialState: CountryState = {
  entities: {},
  isLoaded: false,
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromCountryAction.ActionCountry
): CountryState {
  switch (action.type) {
    case fromCountryAction.LOAD_COUNTRY_SUCCESS: {
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
        isLoaded: true,
        responseStatus
      };
    }

    case fromCountryAction.LOAD_COUNTRY_FAIL: {
      const responseStatus: ResponseStatusModel = action.payload;
      return {
        ...state,
        isLoaded: false,
        responseStatus
      };
    }
  }

  return state;
}

export const getCountryEntities = (state: CountryState) => state.entities;
export const getCountryLoaded = (state: CountryState) => state.isLoaded;
export const getCountryResponseStatus = (state: CountryState) => state.responseStatus;


