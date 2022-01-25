import {createEmptyResponseStatusModel, ResponseStatusModel} from '../../../models/response-status.model';
import * as fromVehicleAction from '../../actions/vehicle.action';
import {getPrefixID} from '../../../constans/prefix-id.const';

export interface VehicleState {
  entities: { [id: string]: any };
  isLoaded: boolean;
  responseStatus: ResponseStatusModel;
}

export const initialState: VehicleState = {
  entities: {},
  isLoaded: false,
  responseStatus: createEmptyResponseStatusModel()
};

export function reducer(
  state = initialState,
  action: fromVehicleAction.ActionVehicle
): VehicleState {
  switch (action.type) {
    case fromVehicleAction.LOAD_VEHICLE_SUCCESS: {
      const responseStatus: ResponseStatusModel = action.payload;
      const entities = action.payload?.data.reduce(
        (result: { [id: string]: any }, item: any) => {
          return {
            ...result,
            [getPrefixID(item.id)]: item,
          };
        },
        {
          ...state.entities,
        }
      );

      return {
        ...state,
        entities,
        isLoaded: true,
        responseStatus
      };
    }

    case fromVehicleAction.LOAD_VEHICLE_FAIL: {
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

export const getVehicleEntities = (state: VehicleState) => state.entities;
export const getVehicleLoaded = (state: VehicleState) => state.isLoaded;
export const getVehicleResponseStatus = (state: VehicleState) => state.responseStatus;


