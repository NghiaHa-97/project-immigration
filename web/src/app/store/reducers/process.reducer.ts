import * as fromProcessAction from '../actions/process.action';

export interface ProcessState {
  value: boolean;
}

export const initialState: ProcessState = {
  value: false
};

export function reducer(
  state: ProcessState = initialState,
  action: fromProcessAction.ProcessAction): ProcessState {

  switch (action.type) {
    case fromProcessAction.PROCESS_START: {
      return {...state, value: true};
    }

    case fromProcessAction.PROCESS_STOP: {
      return {...state, value: false};
    }
  }
  return state;
}

export const getProcess = (state: ProcessState) => state.value;
