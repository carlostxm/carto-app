import { ActionTypes } from './actionTypes';
import { BaseAction, Dataset } from 'model';
import { Dispatch } from 'react';

export type AddDatasetAction = BaseAction<{
  dataset: Dataset;
}>;

export function addDataset(
  dispatch: Dispatch<AddDatasetAction>,
  dataset: Dataset
) {
  return dispatch({
    type: ActionTypes.AddDataset,
    payload: {
      dataset: dataset,
    },
  });
}
