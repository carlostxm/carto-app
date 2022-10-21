import { ActionTypes } from 'actions';
import { BaseAction } from 'model';
import { Dispatch } from 'react';

export type FetchTableStartedAction = BaseAction<{
  name: string;
}>;

export function fetchTableStarted(
  dispatch: Dispatch<FetchTableStartedAction>,
  name: string
) {
  return dispatch({
    type: ActionTypes.FetchTableStarted,
    payload: {
      name,
    },
  });
}
