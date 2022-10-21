import { ActionTypes } from './actionTypes';
import { BaseAction, Dataset } from 'model';
import { Dispatch } from 'react';

export type AddLayerAction = BaseAction<{
  datasetId: string;
}>;

export function addLayer(dispatch: Dispatch<AddLayerAction>, dataset: Dataset) {
  return dispatch({
    type: ActionTypes.AddLayer,
    payload: {
      datasetId: dataset.id,
    },
  });
}
