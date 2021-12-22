import {Action} from '@ngrx/store';

export const PROCESS_START = '[PROCESS] Process Start';
export const PROCESS_STOP = '[PROCESS] Process Stop';

export class ProcessStart implements Action {
  readonly type = PROCESS_START;

  constructor() {
  }
}

export class ProcessStop implements Action {
  readonly type = PROCESS_STOP;

  constructor() {
  }
}

export type ProcessAction = ProcessStart | ProcessStop;
