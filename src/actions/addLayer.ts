import { ActionTypes } from './actionTypes';
import { BaseAction, Dataset, LayerType } from 'model';
import { Dispatch } from 'react';

export type AddLayerAction = BaseAction<{
  datasetId: string;
  layerType: LayerType;
}>;

export function addLayer(
  dispatch: Dispatch<AddLayerAction>,
  dataset: Dataset,
  layerType: LayerType
) {
  return dispatch({
    type: ActionTypes.AddLayer,
    payload: {
      datasetId: dataset.id,
      layerType,
    },
  });
}
