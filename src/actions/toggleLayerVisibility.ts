import { ActionTypes } from './actionTypes';
import { BaseAction } from 'model';
import { Dispatch } from 'react';

export type ToggleLayerVisibilityAction = BaseAction<{
  layerId: string;
}>;

export function toggleLayerVisibility(
  dispatch: Dispatch<ToggleLayerVisibilityAction>,
  layerId: string
) {
  return dispatch({
    type: ActionTypes.ToggleLayerVisibility,
    payload: {
      layerId,
    },
  });
}
